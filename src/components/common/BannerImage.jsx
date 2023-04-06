export default function BannerImage({img = ""}) {
    return (
        <>
            <div class="banner-img"
                style={{ "backgroundImage": `url(${img})` }}
            ></div>
        </>
    );
}