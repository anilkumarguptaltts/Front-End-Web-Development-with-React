import React, { Component } from 'react';
import { Routes,Route,useParams } from 'react-router-dom';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { postComment,fetchDishes,fetchComments,fetchPromos, fetchLeaders,postFeedback } from '../redux/ActionCreator';
import { actions } from 'react-redux-form';
import { TransitionGroup,CSSTransition } from 'react-transition-group';


const mapStateToProps = state=>{
    return {
      dishes : state.dishes,
      comments : state.comments,
      promotions : state.promotions,
      leaders : state.leaders
    };
}

const mapDishpatchToProps = (dispatch) =>({
      postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
      postFeedback:(firstname,lastname,telnum,email,agree,contactType,message) => dispatch(postFeedback(firstname,lastname,telnum,email,agree,contactType,message)),
      fetchDishes: () => { dispatch(fetchDishes())},
      resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
      fetchComments: () => dispatch(fetchComments()),
      fetchPromos: () => dispatch(fetchPromos()),
      fetchLeaders:() => dispatch(fetchLeaders())
});

class Main extends Component {

  constructor(props) {
    super(props);
   
  }

 
//   onDishSelect(dishId) {
//     console.log("dishiD------------------"+dishId);
//    // console.log(this.state.dishes);
//     this.setState({ selectedDish: dishId});
//    // console.log((this.selectedDish));
//    console.log("SELECTED dishiD------------------"+this.state.selectedDish);
// }

  componentDidMount(){
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();
  }

  render() {
   
    const HomePage= () => {

      // console.log('=====>>>>');
      // console.log(this.props);
      // console.log('<<<<<=====>>>>');


      return(
        <Home 
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishErrMess={this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}
        leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        leadersLoading={this.props.leaders.isLoading}
        leadersErrMess={this.props.leaders.errMess}
        />   
      );
    }
  
    const MenuPage= () => {
      return(
        <div>
        <Menu dishes={this.props.dishes} />       
      </div>
      );
    }
    
  /*const DishWithId = ({match}) => {
    return(
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
    );
  };*/
    const DishWithId = ({match}) => {
      const id = useParams();     
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(id.dishId))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(id.dishId))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
      />
      );
    };

    const AboutPage= () => {
      return(
        <div>
        <About leaders={this.props.leaders}
            leadersLoading={this.props.leaders.isLoading}
            leadersErrMess={this.props.leaders.errMess}
        />       
      </div>
      );
    }
    return (
      <div>
      <Header/>
        <TransitionGroup>
        <CSSTransition classNames="page" timeout={300}>
            <Routes>
                <Route  path="/home" element={<HomePage />} />             
                <Route  path='/menu' element={<MenuPage />} />
                <Route path='/menu/:dishId' element={<DishWithId/>} />
                <Route  path="/contactus" element={<Contact postFeedback={this.props.postFeedback}  resetFeedbackForm={this.props.resetFeedbackForm} />} />
                <Route  path="/aboutus" element={<AboutPage />} />              
            </Routes>
            </CSSTransition>
        </TransitionGroup>
      <Footer />
      </div>
      
      
    );
  }
}

export default connect(mapStateToProps,mapDishpatchToProps)(Main);