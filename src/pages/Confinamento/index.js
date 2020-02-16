import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import api from "../../services/api";
import { LinearProgress, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';
import textLabels from '../textLabels';
import AddIcon from '@material-ui/icons/Add';
import _ from 'lodash';
import { getUserId } from '../../services/auth';

const styles = theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(6),
        right: theme.spacing(2),
    },
});

const columns = [
    {
        name: "_id",
        label: "ID",
        options: {
            filter: false,
            display: false
        }
    },
    {
        name: "name",
        label: "Nome",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "qtyBovine",
        label: "Qtd Bovinos",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "qtyEquine",
        label: "Qtd Equinos",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "initDate",
        label: "Início",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "endDate",
        label: "Fim",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "initConfinement",
        label: "Início Formatado",
        options: {
            filter: false,
            display: false
        }
    },
    {
        name: "endConfinement",
        label: "Fim Formatado",
        options: {
            filter: false,
            display: false
        }
    },
];

class Confinamento extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            data: [],
            loading: true,
            open: false,
            options: {
                filterType: 'textField',
                selectableRowsHeader: false,
                onRowClick: rowData => this.onRowClick(rowData),
                onRowsDelete: rowsDeleted => this.onRowsDeleted(rowsDeleted),
                textLabels: textLabels
            },
            rowData: {
                _id: '',
                name: '',
                qtyBovine: '',
                qtyEquine: '',
                initConfinement: '',
                endConfinement: '',
            },
            error: ''
        };
    }

    componentDidMount = async () => {
        await this.getData();
    } 

    getData = async () => {
        try {
            const response = await api.get("/api/confinement/");
            if (response.data.success && response.data.data !== null) {
                this.setState({ data: response.data.data });
            }
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    }

    onRowsDeleted = (rowsDeleted) => {
        try {
            const { data } = this.state;
            rowsDeleted.data.forEach(element => {
                api.delete("/api/confinement/"+data[element.index]._id);
            });
        } catch (err) {
            console.log(err);
        }
    }

    onRowClick = (rowData) => {
        let formatedRow = {
            _id: rowData[0],
            name: rowData[1],
            qtyBovine: rowData[2],
            qtyEquine: rowData[3],
            initConfinement: rowData[6],
            endConfinement: rowData[7],
        }
        this.setState({ open: true, rowData: formatedRow });
    }

    onFabClick = () => {
        this.setState({ open: true, rowData: {} });
    }

    handleClose = () => {
        this.setState({ open: false, error: '' });
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ rowData: _.set({...this.state.rowData}, event.target.name, event.target.value) });
    }

    addConfinement = (userId, rowData) => {
        api.post("/api/confinement/"+userId, rowData).then(response => { 
            if (response.data.success) {
                this.getData();
                this.handleClose();
            }
        })
        .catch(error => {
            this.setState({ error: error.response.data.error.message});
        });
    }

    updateConfinement = (rowData) => {
        api.put("/api/confinement/"+rowData._id, rowData).then(response => { 
            if (response.data.success) {
                this.getData();
                this.handleClose();
            }
        })
        .catch(error => {
            this.setState({ error: error.response.data.error.message});
        });
    }

    handleClickSave = async () => {
        this.setState({ error: ''});
        
        const userId = getUserId();
        const { rowData } = this.state;
        
        if (!rowData._id) {
            this.addConfinement(userId, rowData);
        } else {
            this.updateConfinement(rowData);
        }
    }

    render() {
        const { data, loading, options, open, rowData, error } = this.state;
        const { classes } = this.props;

        if (data.length <= 0 && loading) {
            return ( 
                <div className="w-full">
                    <div className="text-center">
                        <LinearProgress color="secondary" />
                    </div>
                </div>
            );
        }   
            
        return(
            <div>
                <MUIDataTable
                    title={"Confinamento"}
                    data={data}
                    columns={columns}
                    options={options}
                />

                <Fab color="secondary" aria-label="add" className={classes.fab} onClick={this.onFabClick}>
                    <AddIcon />
                </Fab>

                <div>
                    <Dialog
                        open={open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Confinamento</DialogTitle>
                        <DialogContent>
                            <DialogContentText color="secondary" align="center">
                                {error}
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="name"
                                label="Name"
                                type="text"
                                value={rowData.name || ''}
                                variant="outlined"
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextField                                
                                margin="dense"
                                name="qtyBovine"
                                label="Qtd Bovinos"
                                type="number"
                                value={rowData.qtyBovine || ''}
                                variant="outlined"
                                onChange={this.handleChange}
                                inputProps={{
                                    min: 0
                                }}                                
                                fullWidth
                            />
                            <TextField                                
                                margin="dense"
                                name="qtyEquine"
                                label="Qtd Equinos"
                                type="number"
                                value={rowData.qtyEquine || ''}
                                variant="outlined"
                                onChange={this.handleChange}
                                inputProps={{
                                    min: 0
                                }}
                                fullWidth
                            />
                            <TextField                                
                                margin="dense"
                                name="initConfinement"
                                label="Início"
                                type="date"
                                value={rowData.initConfinement || ''}
                                variant="outlined"
                                onChange={this.handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                            <TextField                                
                                margin="dense"
                                name="endConfinement"
                                label="Fim"
                                type="date"
                                value={rowData.endConfinement || ''}
                                variant="outlined"
                                onChange={this.handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={this.handleClickSave} color="primary">
                                Salvar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Confinamento);