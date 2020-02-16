import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import api from "../../services/api";
import { LinearProgress, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Grid, Divider, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import textLabels from '../textLabels';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getToken } from "../../services/auth";

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

class Trato extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: true,
            open: false,
            options: {
                filterType: 'textField',
                selectableRowsHeader: false,
                onRowClick: rowData => this.onRowClick(rowData),
                textLabels: textLabels
            },
            rowData: {},
            treatment: {},
            token: ''
        }
    }

    componentDidMount = async () => {
        try {
            const token = await getToken();
            const response = await api.get("/api/confinement/", { headers: {'x-access-token': token} });
            if (response.data.success && response.data.data !== null) {
                this.setState({ data: response.data.data });
            }
        } catch (err) {
            console.log(err);
        } finally {
            this.setState({ loading: false });
        }
    } 

    onRowClick = async (rowData) => {
        const token = await getToken();
        const response = await api.get("/api/confinement/treatment/"+rowData[0], { headers: {'x-access-token': token} }); 

        if (response.data.success && response.data.data !== null) {
            this.setState({ treatment: response.data.data });

            const formatedRow = {
                _id: rowData[0],
                name: rowData[1],
                qtyBovine: rowData[2],
                qtyEquine: rowData[3],
                initDate: rowData[4],
                endDate: rowData[5],
            }
            
            this.setState({ open: true, rowData: formatedRow });
        }

    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { data, loading, options, open, rowData, treatment } = this.state;

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
                    title={"Trato"}
                    data={data}
                    columns={columns}
                    options={options}
                />

                <div>
                    <Dialog
                        open={open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Trato</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Sabe-se que um Boi começa o confinamento com 400kg e um Cavalo começa o 200kg, 
                                o ganho de peso diário é em torno de 800gr para o cavalo e 1.1kg para o Boi, 
                                e o trato diário de cada animal é em torno de 0.005% do seu peso.
                            </DialogContentText>
                            <Grid container spacing={1}>
                                <Grid item xs={8}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        name="name"
                                        label="Name"
                                        type="text"
                                        value={rowData.name || ''}
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField                                        
                                        margin="dense"
                                        name="qtyDays"
                                        label="Qtd Dias"
                                        type="text"
                                        value={treatment.qtyDays || ''}
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField                                
                                        margin="dense"
                                        name="qtyBovine"
                                        label="Qtd Bovinos"
                                        type="number"
                                        value={rowData.qtyBovine || ''}
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}                                
                                        fullWidth
                                    />                                   
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField                                
                                        margin="dense"
                                        name="qtyEquine"
                                        label="Qtd Equinos"
                                        type="number"
                                        value={rowData.qtyEquine || ''}
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField                                
                                        margin="dense"
                                        name="initDate"
                                        label="Início"
                                        type="text"
                                        value={rowData.initDate || ''}
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField                                
                                        margin="dense"
                                        name="endDate"
                                        label="Fim"
                                        type="text"
                                        value={rowData.endDate || ''}
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}    
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <br/>
                            <Divider />
                            <br/>
                            <Typography>Bovinos</Typography>
                            {!!treatment && !!treatment.bovine &&
                                <Grid container spacing={1}>                                    
                                    <Grid item xs={6}>
                                        <TextField                                
                                            margin="dense"
                                            label="Ganho de peso por animal (Kg)"
                                            type="text"
                                            value={treatment.bovine.weightBovine.toFixed(3) || ''}
                                            variant="outlined"
                                            InputProps={{
                                                readOnly: true,
                                            }}    
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField                                
                                            margin="dense"
                                            label="Total de ração no período (Kg)"
                                            type="text"
                                            value={treatment.bovine.totalFeed.toFixed(3) || ''}
                                            variant="outlined"
                                            InputProps={{
                                                readOnly: true,
                                            }}    
                                            fullWidth
                                        />
                                    </Grid>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Qtd de ração utilizada por dia (Kg)</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                        <Grid container spacing={1}>
                                            {treatment.bovine.arrDayFeedBovine.map((value, index) => (
                                                <Grid item xs={3}>
                                                    <Typography key={index} variant="caption"><b>Dia {index+1}:</b> {value.toFixed(3)}</Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>                                    
                                </Grid>
                            }                            
                            <br/>
                            <Divider />
                            <br/>
                            <Typography>Equinos</Typography>
                            {!!treatment && !!treatment.equine &&                               
                                <Grid container spacing={1}>                                    
                                    <Grid item xs={6}>
                                        <TextField                                
                                            margin="dense"
                                            label="Ganho de peso por animal (Kg)"
                                            type="text"
                                            value={treatment.equine.weightEquine.toFixed(3) || ''}
                                            variant="outlined"
                                            InputProps={{
                                                readOnly: true,
                                            }}    
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField                                
                                            margin="dense"
                                            label="Total de ração no período (Kg)"
                                            type="text"
                                            value={treatment.equine.totalFeed.toFixed(3) || ''}
                                            variant="outlined"
                                            InputProps={{
                                                readOnly: true,
                                            }}    
                                            fullWidth
                                        />
                                    </Grid>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Qtd de ração utilizada por dia (Kg)</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                        <Grid container spacing={1}>
                                            {treatment.equine.arrDayFeedEquine.map((value, index) => (
                                                <Grid item xs={3}>
                                                    <Typography key={index} variant="caption"><b>Dia {index+1}:</b> {value.toFixed(3)}</Typography>
                                                </Grid>
                                            ))}
                                        </Grid>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>          
                                </Grid>
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Fechar
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Trato);