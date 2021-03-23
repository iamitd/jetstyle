import React, {useState} from 'react';

const Listing = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [bookAuthor, updateBookAuthor] = useState(JSON.parse(localStorage.getItem(props.bookKey)).author);
    let [bookName, updateBookName] = useState(JSON.parse(localStorage.getItem(props.bookKey)).name);
    let [bookImage, updateBookImage] = useState(JSON.parse(localStorage.getItem(props.bookKey)).image);


    const onBookAuthorChange = (e) => {
        updateBookAuthor(e.target.value.trim())
    }
    const onNameAuthorChange = (e) => {
        updateBookName(e.target.value.trim())
    }
    const onImageAuthorChange = async (e) => {
        const file = e.target.files[0]
        const base64 = await props.convertBase64(file);
        updateBookImage(base64)
    }

    const activateEditMode = () => {
        setEditMode(!editMode);
        if (editMode) {
            localStorage.removeItem(`${JSON.parse(localStorage.getItem(props.bookKey)).author}${JSON.parse(localStorage.getItem(props.bookKey)).name}`)
            localStorage.setItem(`${bookAuthor}${bookName}`, JSON.stringify({
                author: bookAuthor,
                name: bookName,
                image: bookImage
            }));
            props.updateBookList(Object.keys(localStorage));
        }
    }

    function deleteBookList(u) {
        localStorage.removeItem(u)
        props.updateBookList(Object.keys(localStorage));
    }

    return (
        <li key={props.bookKey}>
            {editMode &&
            <div className={"app__listing__book"}>
                <div className={"app__listing__book_img"}>
                    <img src={`${bookImage}`} alt="Base64 Image" className={"app__listing__book_image"}/>
                </div>
                <div className={"app__listing__book__about"}>
                    <div className={"app__listing__book__about_name"}>
                        <input type={"input"} name={"name"} onChange={onNameAuthorChange}
                                              value={bookName}/>
                    </div>
                    <div className={"app__listing__book__about_author"}>
                        <input type={"input"} name={"author"} onChange={onBookAuthorChange}
                                           value={bookAuthor}/>
                    </div>
                    <div className={"app__listing__book__about_buttons"}>
                        <input type={"file"} name={"image"} onChange={onImageAuthorChange}/>
                        <button onClick={activateEditMode}>Сохранить изменения</button>
                    </div>
                </div>
            </div>
            }
            {!editMode &&
            <div className={"app__listing__book"}>
                <div className={"app__listing__book_img"}>
                    <img src={`${bookImage}`} alt="Base64 Image" className={"app__listing__book_image"}/>
                </div>
                <div className={"app__listing__book__about"}>
                    <div className={"app__listing__book__about_name"}>
                        {bookName}
                    </div>
                    <div className={"app__listing__book__about_author"}>
                        {bookAuthor}
                    </div>
                    <div className={"app__listing__book__about_buttons"}>
                        <button onClick={activateEditMode}>Редактировать</button>
                        <button onClick={() => {
                            deleteBookList(props.bookKey)
                        }}>Удалить
                        </button>
                    </div>
                </div>
            </div>
            }
        </li>
    )
}

export default Listing;