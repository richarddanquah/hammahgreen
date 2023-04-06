import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import BreadCrumbBanner from "./SiteBreadCrumbBanner";
import BannerImage from "../common/BannerImage";

const index = () => {
    return (
        <>
            {/* <!-- Main Header Nav --> */}
            <Header />

            {/* <!--  Mobile Menu --> */}
            <MobileMenu />

            {/* <!-- Inner Page Breadcrumb --> */}
            <BreadCrumbBanner />

            <section className="container">
                <div className="row mt20 mb20">
                    <div className="col-lg-8 offset-lg-0">
                        <div className="about_content">
                            <h3>Natural Beachfront Ambiance</h3>
                            <br />
                            <p>
                                The Waterviews site is a gorgeous oceanfront and lakeside neighborhood that picture-perfectly boasts 2 separate, million dollar views, exclusivity, security and a balanced community. Waterviews is the premiere enclave of a larger luxury community project called Winneba Estates. Those who enter the community will see the idyllic lakeside and mountain views that you will wake up to and enjoy everyday, with the sound of a calming seaside beach that whispers of a serene ocean view. After conquering the world or taking a rest from your ambitions, simply sit still with the window open and hear the natural peace of one of the world’s best features – the sound of water kissing the shore.
                            </p>

                            <p>
                                Originally your neighborhood hosted a fishing community of squatters living in makeshift grass homes and unfinished structures. Hammah Green is incorporating modest homes, a walking distance from the shore, that allow this community to maintain their naturally rich culture that includes line-fishing which adds to the beautiful coastal ambiance. This has upgraded their living conditions to include electricity, water and sanitation. In addition, Hammah Green has provided a centre for their preparation and cold storage of fish to help make their fishing lifestyle more profitable.
                            </p>

                            <p>
                                So behind the lavish solar powered, smart-homes is a gorgeous ocean front that features priceless, natural character composed of picturesque fishing canoes, baskets and colorful fishing lines neatly placed after a day’s work.
                            </p>

                            <h4 className="large">
                                Conservation Amenities
                            </h4>

                            <BannerImage img="../assets/images/site/spur-winged-lapwing.jpeg" />
                            <i>Spur winged lapwing</i> • <span><b> Photo Credit: ARocha Ghana</b></span>

                            <br />
                            <br />

                            <p>
                                The Winneba Estates site directly sits beside natural, conservatory jewels. The luxurious site that boasts priceless water views, also serves as a migratory route for over 23,000 water birds. The mosaic of migratory birds are made up of 48 species comprising of 29 species of waders, 8 species of terns, 2 species of gulls, 7 species of herons and egrets, 1 species each of duck and cormorant have been recorded at the site. The most abundant waterbird species are the Curlew Sandpiper (Charidrius Hiaticula), the Common Greenshank (Tringa Nebularia), the Black-winged Stilt (Himantopus Himantopus), the Black Tern (Chlidonias Niger), the Common Tern (Sterna Hirundo), the Royal Tern (Sterna maxima) and the Sandwich Tern (Sterna sandvicensis).
                            </p>

                            <BannerImage img="../assets/images/site/leatherback-turtle.jpeg" />
                            <i>Leatherback turtle</i> • <span><b> Photo credit: Ghana Turtle Conservation Project</b></span>

                            <br />
                            <br />

                            <p>
                                The Muni- Pomadze Ramsar Site also shares the coastal beach with us. Travel several hundreds of feet and witness the nesting site for 3 endangered marine turtles; namely the IUCN-Red-Listed endangered Green Turtle (Chelonia mydas), and two vulnerable species, the Leatherback Turtle (Dermochelys Coriacea) and the Olive Ridley (Lepidochelys Olivacea), all with declining populations.
                            </p>

                            <p>
                                Between the months of October and April every year, the turtles come out in droves to mate and lay eggs. It is a spectacle to behold and many European and Australian tourists visit to see this wonder of nature.
                            </p>

                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Our Footer --> */}
            <section className="footer_one">
                <div className="container">
                    <div className="row">
                        <Footer />
                    </div>
                </div>
            </section>

            {/* <!-- Our Footer Bottom Area --> */}
            <section className="footer_middle_area pt40 pb40">
                <div className="container">
                    <CopyrightFooter />
                </div>
            </section>

        </>
    );
}

export default index;