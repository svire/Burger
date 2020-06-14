import React, {Component} from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary";

const withErrorHandler = (WrapedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null
      };
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
      //pogledaj u Modal   BurgerBuilder =>modalClosed={this.purchaseCancelHandler}  <Modal ////
    };

    //ovo dole nije dobra ideja jer postoji dosta interceptors koji leze u memoriji za svaki put kad je kreirana
    // HOC(){} return class{   axios.interceptors i to   }
    //PA BI TREBALO REMOVE INTERCEPTOR WHEN COMPONENT IS UNMOUNTED
    //da fatas greske od axiosa         null jer ga zanima samo greska
    componentWillMount() {
      //request stavlja da CLEAN ANY ERRORS
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({error: null});
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({error: error});
        }
      );
    }
    //executed in point in time when compo is not required anymore
    //ili u reactHooks cleanup     //to prevent Memory Leaks
    componentWillUnmount() {
      console.log("Will unmount", this.reqInterceptor, this.resInterceptor); //gledaj iz app state compo
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.resInterceptor);
    }

    render() {
      //Pogledaj u Burger builder isto je modal closed
      // <Modal       show={this.state.purchasing}       modalClosed={this.purchaseCancelHandler}

      //valjda zato sto je ovo Burger Builder koji ima modalClosed
      return (
        <Aux>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapedComponent {...this.props} />
        </Aux>
      );
    } //convert it to the class da moze  treba componentDidMount lifecycle
  };
};

export default withErrorHandler;

//<WrapedComponent  {...props}/>        sa svim props koje prima da se ne izgube
