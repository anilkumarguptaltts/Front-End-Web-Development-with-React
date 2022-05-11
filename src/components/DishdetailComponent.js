import React, { Component } from 'react';
import { Card,CardImg,CardBody,CardText,CardTitle,Breadcrumb,BreadcrumbItem, Button,Modal,ModalBody, ModalHeader, Label, Row,Col  } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

export class CommentForm extends Component {

    constructor(props) {
        super(props);
        
        this.toggleModal = this.toggleModal.bind(this);

        this.state = {
            isModalOpen: false
        }
    }

    toggleModal() {
            this.setState({
                isModalOpen : !this.state.isModalOpen
            });
        }

        
    handleSubmit(values) {
        this.toggleModal();
        console.log(this.props.dishId);
        console.log(values);

        this.props.postComment(this.props.dishId,values.rating, values.author,values.comment)       
        //alert('Current State is: ' + JSON.stringify(values));

    }
    
    render() {
            return (
                <div>
                    <Button color="secondary" outline onClick={this.toggleModal}>
                        <span className='fa fa-pencil fa-lg'>Submit Comment</span>
                    </Button>                  
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                </Control.select>                                
                                </Col>
                            </Row>
                         <Row className="form-group">
                                <Label htmlFor="author" md={4}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        placeholder="Comment"
                                        className="form-control"
                                        rows="6"
                                        />                                   
                                </Col>
                            </Row>

                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </div>
            )
        }
    }
    
    function RenderComments({comments})
    {

        if(comments !=null){
            return comments.map((comments,k)=>{
                return(
                   
                            <ul className='list-unstyled'  key={k}>
                                <Stagger in>
                                    <Fade in>
                                <li>
                                    <p>{comments.comment}</p>
                                    <p>--{comments.author},
                                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                                </li>
                                </Fade>
                                </Stagger>
                            </ul> 
                )
            })
        }else{
            return(
                <div></div>

            );
        }        
    }
    function RenderDish({dish})
    {
         if (dish != null)
         {            
             return(
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                 <Card>
                     <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                     <CardBody>
                       <CardTitle>{dish.name}</CardTitle>
                       <CardText>{dish.description}</CardText>
                     </CardBody>                    
                 </Card>  
                 </FadeTransform>               
             );
             }else{
                return(
                    <div></div>
                );
             }             
     }

     const DishDetails = (props) => {
         if(props.isLoading){
             return(
                <div className='container'>
                    <div className='row'>
                        <Loading/>
                    </div>
                </div>
             );
         }else if(props.errMess){
            return(
                <div className='container'>
                    <div className='row'>
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
             );
         }
         else if (props.dish != null)
         {
            return (
                <div className="container"> 
                <div className="row">
                  <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                  </Breadcrumb>
                 
                </div>              
                    <div className="row">
                      <div  className="col-12 col-md-5 m-1">
                      <RenderDish dish={props.dish} />
                      </div>
                      <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                        <RenderComments comments={props.comments}
                        postComment={props.postComment} 
                        dishId = {props.dish.id}/> 
                        <CommentForm  postComment={props.postComment} 
                        dishId = {props.dish.id}/>            
                         </div>
                    </div>
                </div>
            );
         }
    }

export default DishDetails;