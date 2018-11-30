import React from 'react'
import { graphql, withApollo } from "react-apollo";
import { me, allUser } from '../graphql/queries'
import Amplify, { API, graphqlOperation } from "aws-amplify";

class UserInfo extends React.Component {

  getMe = async () => {
    const user = await API.graphql(graphqlOperation(me));
    console.log({user});
  }

  render () {



    // Simple query

    // console.log({...this.props})
    const {user } = this.props
    return (
      <div>
        <button onClick={this.getMe}>GET ME</button>
        {/* <p>{user}</p> */}
      </div>
    )
  }
  
} 

export default
  graphql(
    allUser,
    {
      options: {
        fetchPolicy: 'cache-and-network',
      },
      props: ({ data }) => {
        console.log(data)
        return { user : data}
      }
      
    }
)(UserInfo);