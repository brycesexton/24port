import React from 'react'
import styles from './BookmarkList.module.scss'
import Bookmark from '../Bookmark/Bookmark'

const iconUrl = 'https://previews.dropbox.com/p/thumb/ACPwLlzomnznSWXyn4T1_3qZ5qjh7-ZRMGKvRP8YEHGrQt0aP2X9URkAhc4OjRzELM4SEmGWiACsHZaGAQrAY3Il4eJCLuSbv81zJ499jzX5zMmRpP58AvmuoFPGY13lq84zNlSgc4UGOWNhlCJp2HfmkyQBb6gDLRMcQAcib60E8HgHoPqIR6mgMDeUDQo614Ijr7NWj9EdtuTm3BKDOKvpX3liNT0weHQw40--X4n1_GMUN9mEFqo08y08MX23fPXvZ3DzI0iQT0XIP1KC0RZA2Ekqc5HItKLuSrC0gann7VFd-dhig5v3_5nHA_A0B8uxqQNGYHK_6vBvQWB7a51D/p.png'

export default function BookmarkList({
    newBookmark,
    createBookmark,
    setNewBookmark,
    bookmarks,
    deleteBookmark,
    updateBookmark
}) {
    function handleCreateBookmark() {
        if (newBookmark.title && newBookmark.url && newBookmark.url !== 'http://' && newBookmark.url !== 'https://') {
            createBookmark(newBookmark)
        }
    }

    return (
        <>
            <div className={styles.headerContainer}>
                <img src={iconUrl} alt="Bookmark Icon" className={styles.bookmarkIcon} />
                <h1>DEVELOPER PORTFOLIO</h1>
            </div>
            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <div className={styles.titleContainer}>
                        <h3 className={styles.siteName}>Project Name</h3>
                        <input
                            className={styles.input}
                            type="text"
                            value={newBookmark.title}
                            onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleCreateBookmark()
                                }
                            }}
                        />
                    </div>
                    <div className={styles.titleContainer}>
                        <h3 className={styles.siteName}>Description</h3>
                        <input
                            className={styles.input}
                            type="text"
                            value={newBookmark.description}
                            onChange={(e) => setNewBookmark({ ...newBookmark, description: e.target.value })}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleCreateBookmark()
                                }
                            }}
                        />
                    </div>
                    <div className={styles.urlContainer}>
                        <h3 className={styles.siteUrl}>URL</h3>
                        <input
                            className={styles.input}
                            type="text"
                            value={newBookmark.url || 'https://'}
                            onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleCreateBookmark()
                                }
                            }}
                        />
                    </div>
                </div>
                <div className={styles.bookmarksContainer}>
                    <h3>MY SITES</h3>
                    {bookmarks.length > 0 ? (
                        bookmarks.map((bookmark) => (
                            <Bookmark
                                key={bookmark._id}
                                bookmark={bookmark}
                                deleteBookmark={deleteBookmark}
                                updateBookmark={updateBookmark}
                            />
                        ))
                    ) : (
                        <p>You dont have any bookmarks yet.</p>
                    )}
                </div>
            </div>
        </>
    )
}