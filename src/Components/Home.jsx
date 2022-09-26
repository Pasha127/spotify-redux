import { Card,Button,Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { setQuery } from "../Redux/Actions/navActions";
import { setFetched } from "../Redux/Actions/musicActions";

import { useEffect } from 'react'
const mapStateToProps = state => {
    return {
      searchQuery: state.nav.nav.query,
      fetched: state.music.music.response   
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      setQ: query => {
        dispatch(setQuery(query));
      },
        setF: fetched=>{
            console.log("dispatch", fetched);
            dispatch(setFetched(fetched))
        }   }
    };

const Home = (props)=>{
    let canMap=false;
    
    let isLoading=false;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '71976e22femshc59a0991cc2347cp1afa84jsnf21821e7ac7a',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };
    
    const loadTracks = async (input) => {isLoading=true;    
        try{
            console.log(input)
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${input}`, options);
            if (response.ok){
                const {searchData} = await response.json()
                props.setF(searchData)
                canMap =true; isLoading = false;
                
            }}
            catch(err){console.error(err)}
           /*  finally{console.log(props.fetched)} */
            
            
        }
        useEffect(()=>{
            loadTracks(props.searchQuery)
        },[])
        
        const makeCards =  (n=16) => {          
             props.fetched && (props.fetched.data.map((song,i) => {
               if(i<16){ return(
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of
                      the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
               )}else{return(console.log("unprinted card"))}
              }) )
           
        

    }

    return(
        <>
        <div className="content-container">
           <div>{isLoading && (<Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>)}</div>
           <div className="card-box">{canMap && makeCards(2) }</div>
        </div>
        </>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)