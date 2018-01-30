import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class ModalView extends Component {
  render() {
    if(this.props.frameless){
      return <div className="modal-nude  box-card">
              <a onClick={this.props.closeFunc} className="modal-close">X</a>
                <div className="modal-title"> {this.props.title}</div>
         {this.props.children}
        </div>
    }

    return <div className="modal  box-card">
      <a onClick={this.props.closeFunc} className="modal-close">X</a>
              <div className="modal-title"> {this.props.title}</div>
       {this.props.children}
      </div>
  }
}

ModalView.propTypes = {
  title: PropTypes.string,
  frameless: PropTypes.bool,
  children: PropTypes.element,
  closeFunc: PropTypes.func,

};

ModalView.defaultProps = {
  title: '',
  frameless: false
}

export default class Modal extends Component {

constructor(props){
  super(props);
  this.clickedOutside = this.clickedOutside.bind(this)
  this.closeFunc = this.closeFunc.bind(this)

}

  componentDidMount(){
  this.modalWrapperTarget = document.createElement('div')

  this.modalWrapperTarget.className= "modal-wrapper";

  this.modalWrapperTarget.addEventListener('click' , this.clickedOutside);
  this.modalWrapperTarget.addEventListener('click' , this.clickedOutside);
  this.modalWrapperTarget.addEventListener('keydown', this.clickedOutside, true);

  document.body.appendChild(this.modalWrapperTarget)
  this._render();
  }


clickedOutside(e){

  if((e.key=='Escape'||e.key=='Esc'||e.keyCode==27)){
      e.preventDefault();
      this.props.clickOutside(e)
      return false;
  }

  if(this.props.clickOutside && e.target.classList.contains('modal-wrapper')){
    this.props.clickOutside(e)
  }

}

closeFunc(e){
  if(this.props.clickOutside ){
    this.props.clickOutside(e)
  }
}


  _render(){

    ReactDOM.render( <ModalView children={this.props.children} closeFunc={this.closeFunc} title={this.props.title} frameless={this.props.frameless}/>
                      , this.modalWrapperTarget )
  }


componentDidUpdate(){
  this._render()
}

  componentWillUnmount(){

   this.modalWrapperTarget.removeEventListener('click' , this.clickedOutside);
   this.modalWrapperTarget.removeEventListener('keydown' , this.clickedOutside);
    ReactDOM.unmountComponentAtNode(this.modalWrapperTarget);
    document.body.removeChild(this.modalWrapperTarget);
  }

  render() {
    return <noscript/>
  }
}

Modal.propTypes = {
  title: PropTypes.string,
  frameless: PropTypes.bool,
  children: PropTypes.element,
  closeFunc: PropTypes.func,

};

Modal.defaultProps = {
  title: '',
  frameless: false
}
