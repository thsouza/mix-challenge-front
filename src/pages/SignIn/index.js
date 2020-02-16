import React, { Component } from "react";
import { withStyles, TextField } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import Logo from "../../assets/premix-logo.png";
import api from "../../services/api";
import { login, setAdmin, setUserId } from "../../services/auth";
import { Form, Container } from "./styles";

const styles = theme => ({
    input: {
        background: 'white',
        borderRadius: '10px',
        marginTop: '20px'
    }
});

class SignIn extends Component {
    state = {
        userName: "",
        password: "",
        error: ""
    };

    handleSignIn = e => {
        e.preventDefault();
        const { userName, password } = this.state;
        
        if (!userName || !password) {
            this.setState({ error: "Preencha usuário e senha para continuar!" });
        } else {                        
            api.post("/api/user/login", { userName, password }).then(response => { 
                if (response.data.success) {
                    login(response.data.token);
                    setTimeout(() => {
                        this.props.history.push("/app");
                    }, 300);                                      
                    setUserId(response.data.user._id);
                    setAdmin(response.data.user.admin);  
                }
            })
            .catch(error => {
                this.setState({ error: error.response.data.error});
            });            
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <Container>
                <Form onSubmit={this.handleSignIn}>
                    <img src={Logo} alt="premix-logo" />
                    {this.state.error && <p>{this.state.error}</p>}
                    <TextField
                        className={classes.input}
                        id="userName"
                        type="text"
                        variant="outlined"
                        placeholder="Usuário"
                        onChange={e => this.setState({ userName: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        className={classes.input}
                        id="senha"
                        type="password"
                        variant="outlined"
                        placeholder="Senha"
                        onChange={e => this.setState({ password: e.target.value })}
                        fullWidth
                    />
                    <button type="submit">Entrar</button>
                </Form>
            </Container>
        );
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(SignIn));