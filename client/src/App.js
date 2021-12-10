import ApolloClient from 'apollo-boost';
import './App.css';
import BookList from './component/BookList';
const client = new ApolloClient({
  uri: 'localhost:4000/graphql'
})
function App() {
  return (
    <div className="App">
     GraphQL
     <BookList/>
    </div>
  );
}

export default App;
