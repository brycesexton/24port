import { useState, useEffect } from 'react'
import BookmarkList from './pages/ListOfBookmarks/BookmarkList'
import SignUp from './pages/SignUp/SignUp'
import styles from './App.module.scss'

export default function App() {
    const [bookmarks, setBookmarks] = useState([])
    const [newBookmark, setNewBookmark] = useState({ title: '', url: '' })

    //NEW NOT WORKING
    const [user, setUser] = useState(null)
    const [token, setToken] = useState('')

    const createBookmark = async () => {
        const body = { ...newBookmark }
        try {
            const response = await fetch('/bookmarks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) throw new Error('Bad response')
            const createdBookmark = await response.json()
            setBookmarks((prevBookmarks) => [createdBookmark, ...prevBookmarks])
            setNewBookmark({ title: '', url: '' })
        } catch (error) {
            console.error('Failed', error)
        }
    }

    const updateBookmark = async (id, bookmarkToUpdate) => {

    }

    const deleteBookmark = async (id) => {
        try {
            const response = await fetch(`/bookmarks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (!response.ok) {
                throw new Error(`Failed to delete ${id}: ${response.statusText}`)
            }
            setBookmarks(prevBookmarks => prevBookmarks.filter(bookmark => bookmark._id !== id))
        } catch (error) {
            console.error('Error deleting', error)
        }
    }

    const getBookmarks = async () => {
        try {
            const response = await fetch('/bookmarks')
            if (!response.ok) throw new Error('Bad response')
            const data = await response.json()
            setBookmarks(data.reverse())
        } catch (error) {
            console.error('Failed to fetch', error)
        }
    };

    //NEW NOT WORKING
    const signUp = async (credentials) => {
        try {
        const response  =  await fetch('/userRouter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
            })
       const data = await response.json()
            setUser(data.user)
            setToken(data.token)
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
    }   
        catch (error) {
        console.error(error)
    }
}
    //NEW NOT WORKING
    const login = async (credentials) => {
        try {
            const response = await fetch('/userRouter/login', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(credentials)
            })
        const data = await response.json()
        const tokenData = data.token;
            localStorage.setItem('token', tokenData)
            setToken(tokenData)
            const userData = data.user
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData)
    }   
        catch (error) {
        console.error(error)
    }    
}

    useEffect(() => {
        getBookmarks()
    }, [])

    return (
        <div className={styles.App}>
            <BookmarkList
                newBookmark={newBookmark}
                setNewBookmark={setNewBookmark}
                createBookmark={createBookmark}
                bookmarks={bookmarks}
                updateBookmark={updateBookmark}
                deleteBookmark={deleteBookmark}
            />
        </div>
    )
}