import axios from "axios"
import { TrendingCoins } from "../../config/api"
import { CryptoState } from "../../CryptoContext"
import { useEffect, useState } from "react"
import AliceCarousel from "react-alice-carousel"
import { Link } from "react-router-dom"

const Carousel = () => {
    const [trending, setTrending] = useState([])

    const { currency } = CryptoState()

    const fetchTrendingCoins = async ()=>{
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data)
    }
console.log(trending);
    useEffect(()=>{
        fetchTrendingCoins()
    }, [currency])

    const items = trending.map((coin, index) =>{
        return(
            <Link to={`/coins/${coin.id}`} key={index}>
                <img src={coin.image} alt={`${coin.name} image`} height={80} style={{marginBottom: 10}} />
            </Link>
        )
    })

    const responsive = {
        0:{items: 2}, 512: {
            items: 4
        }
    }

  return (
    <div style={{height: "50%", display: "flex", alignItems: "center"}}>
        <AliceCarousel mouseTracking
        infinite autoPlayInterval={1000} animationDuration={1500}
        disableDotsControls responsive={responsive}
        autoPlay
        items={items}/>
    </div>
  )
}

export default Carousel