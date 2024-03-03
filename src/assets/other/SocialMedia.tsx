
import {FacebookShareButton,FacebookIcon,WhatsappShareButton,WhatsappIcon,TwitterShareButton,TwitterIcon,LinkedinShareButton,LinkedinIcon,XIcon} from "react-share"

export default function SocialMedia({url}:{url:string}) {


    return (
        <div className="flex gap-x-4">
            <div className="hover:opacity-55">
                <FacebookShareButton url={url}>
                    <FacebookIcon round size={40} />
                </FacebookShareButton>
            </div>
            <div className="hover:opacity-55">
                <WhatsappShareButton url={url}>
                    <WhatsappIcon round size={40} />
                </WhatsappShareButton>
            </div>  
            <div className="hover:opacity-55">
                <TwitterShareButton url={url}>
                    <XIcon round size={40} />
                </TwitterShareButton>
            </div> 
            <div className="hover:opacity-55">
                <LinkedinShareButton url={url}>
                    <LinkedinIcon round size={40} />
                </LinkedinShareButton>
            </div> 
        </div>
    )
}