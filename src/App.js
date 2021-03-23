import React, {useState} from 'react';
import './App.css';
import Form from "./components/Form";
import Listing from "./components/List/Listing";

function App() {

    let [booksList,updateBookList] = useState(Object.keys(localStorage));

    const convertBase64=(file)=>{
        return new Promise((resolve,reject)=> {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload =() => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const booksListing = booksList.map((u,index) =>
        <Listing booksList={booksList} updateBookList={updateBookList}
                 convertBase64={convertBase64}
                 bookKey={u} bookKeyId={index}/>
    )
    return (
        <div className="App">
            <Form updateBookList={updateBookList} convertBase64={convertBase64}/>
            <ul className={"app__listing"}>
            {booksListing}
            </ul>
        </div>
    );
}

export default App;
