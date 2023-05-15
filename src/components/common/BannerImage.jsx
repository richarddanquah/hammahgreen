export default function BannerImage({img = ""}) {
    return (
        <>
            <div className="banner-img"
                style={{ "backgroundImage": `url(${img})` }}
            ></div>
        </>
    );
}