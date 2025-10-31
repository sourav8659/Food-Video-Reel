import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Reusable feed for vertical reels
// Props:
// - items: Array of video items { _id, video, description, likeCount, savesCount, commentsCount, comments, foodPartner }
// - onLike: (item) => void | Promise<void>
// - onSave: (item) => void | Promise<void>
// - emptyMessage: string
const ReelFeed = ({items = [], emptyMessage = 'No videos yet.'}) => {
    const videoRefs = useRef(new Map())

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target
                    if (!(video instanceof HTMLVideoElement)) return
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                        video.play().catch(() => { /* ignore autoplay errors */ })
                    } else {
                        video.pause()
                    }
                })
            },
            { threshold: [0, 0.25, 0.6, 0.9, 1] }
        )

        videoRefs.current.forEach((vid) => observer.observe(vid))
        return () => observer.disconnect()
    }, [items])

    const setVideoRef = (id) => (el) => {
        if (!el) { videoRefs.current.delete(id); return }
        videoRefs.current.set(id, el)
    }

    return (
        <div className="reels-page">
            <div className="reels-feed" role="list">
                {items.length === 0 && (
                    <div className="empty-state">
                        <p>{emptyMessage}</p>
                    </div>
                )}

                {items.map((item) => (
                    <section key={item._id} className="reel" role="listitem">
                        <video
                            ref={setVideoRef(item._id)}
                            className="reel-video"
                            src={item.video}
                            muted
                            playsInline
                            loop
                            preload="metadata"
                        />

                        <div className="reel-overlay">
                            <div className="reel-overlay-gradient" aria-hidden="true" />

                            <div className="reel-content">
                                <p className="reel-description" title={item.description}>{item.description}</p>
                                {item.foodPartner && (
                                    <Link className="reel-btn" to={"/food-partner/" + item.foodPartner} aria-label="Visit store">Visit store</Link>
                                )}
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}

export default ReelFeed
