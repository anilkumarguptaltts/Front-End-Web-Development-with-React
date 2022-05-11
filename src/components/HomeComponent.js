import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,Media} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}) {
    if(isLoading){
        return(            
            <Loading />
        );
    }else if(errMess){
        return(
            <h4>{errMess}</h4>
        );
    }
    else
    {
        return(
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                 <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null }
                <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
    }
   

}
function Home(props) {

    //console.log('1===========>>>>>');
    //console.log(props);
    //console.log('2===========>>>>>');

    return(      
       <Media>
        <Media left className="col-42">
            <RenderCard item={props.dish} 
                isLoading={props.dishesLoading}
                errMess = {props.dishErrMess}
                />
        </Media>
        <Media className="col-4">
        <RenderCard item={props.promotion} isLoading={props.promoLoading} errMess={props.promoErrMess} />
        </Media>
        <Media right className="col-4">
        <RenderCard item={props.leader}
          isLoading={props.leadersLoading}
          errMess = {props.leadersErrMess}
        />
        </Media>
       </Media>
    );
}

export default Home;  
