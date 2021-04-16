import React, { Component } from 'react'
import Photo from './Photo'
import Nophotos from './Nophotos'

class PhotoContainer extends Component {

    render() {
        const photo = this.props.photo
        console.log(photo)
        let photos
        if (photo.length > 0) {
            photos = photo.map(photo => {
                return <Photo url={"https://live.staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg"} key={photo.id} />
            })
        }
        else
            photos = <Nophotos />

        return (
            <div className="photo-container" >
                <ul>
                    {photos}
                </ul>
            </div>
        )
    }
}

export default PhotoContainer