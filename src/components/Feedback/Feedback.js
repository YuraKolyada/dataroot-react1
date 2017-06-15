
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Feedback.scss';
import { connect, bindActionCreators } from 'react-redux';
import { callback } from '../../actions/HomeActions';

class Feedback extends React.Component {
  constructor(){
    super();
    this.state = {
      msgVisible: true,
    }
  }
  
  onHandleSubmit(e){
    e.preventDefault();
    let myform = document.forms.myform,
      { dispatch } = this.props;
    dispatch(callback(myform));

    this.setState({
      msgVisible: true
    });

    myform.reset();

    setTimeout(() => this.setState({
      msgVisible: false
    }), 5000)
  } 

  render() {
    let { msg } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h2 className={s.title}>Виготовимо наступний шедевр разом</h2>
          <p className={s.text}>Зв’яжіться з нами та дізнайтесь більше</p>
          <form name="myform"className={s.form} onSubmit={this.onHandleSubmit.bind(this)}>
              <input className={s.name} placeholder="Ім’я" type="text" name="name" required></input>
              <input className={s.tel} placeholder="Телефон" type="text" name="phone" required></input>
              <input className={s.mail} placeholder="E-mail" type="email" name="email" required></input>
              <textarea type="text" placeholder="Ваша ідея або питання" name="msg" required className={s.quetions}></textarea>
              <button className={s.submit}>Зв’язатись</button>
              {this.state.msgVisible ? <p className={s.msg}>{msg}</p> : null}
          </form>
        </div>
      </div>
    );
  }
};

function mapToActionProps(dispatch){
  return {
    dispatch
  }
}

function mapToStateProps(state){
  return {
    msg: state.PageHomeData.textRequest.msg
  }
}


export default withStyles(s)(connect(mapToStateProps, mapToActionProps)(Feedback));
