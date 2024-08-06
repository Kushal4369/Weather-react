import React, { useRef, useState } from 'react'
import { WiHumidity } from "react-icons/wi";
import { IoIosSpeedometer } from "react-icons/io";


const Card = () => {
    const [data, setData] = useState({
        city: 'London',
        temperature: 48,
        icon: '10d',
        description: 'RAIN',
        humidity: 90,
        wind_speed: 3.2


    })
    console.log(data.city)

    let icon_url = `https://openweathermap.org/img/wn/${data.icon}@2x.png`

    const search = async () => {

        const search_input =document.getElementById('search')
        const city = search_input.value

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'cb53899549bfdfa69b02c3c6ce8d1685'}&units=metric`;
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
            setData({
                city: city,
                temperature: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].description.toUpperCase(),
                humidity: data.main.humidity,
                wind_speed: data.wind.speed
            }
        )
            

        } catch (error) {
            console.log(error)

        }
    }


    return (
        <div className='h-[500px] w-3/4 bg-purple-700 rounded-xl p-3 shadow-xl shadow-purple-400 flex flex-col items-center '>
            <div className='flex w-5/6 my-5'>
                <input type='text' className='font-mono w-4/5 h-11 border-gray-400 border-4 rounded-2xl p-1 focus:outline-purple-950' id='search' placeholder='Enter City Name' />
                <button className='rounded-full bg-white h-10 mx-3' onClick={search}><i className="fa-solid fa-magnifying-glass p-3"></i></button>
            </div>
            <div>
                <h1 className='text-white text-5xl font-bold font-sans m-5'>{data.temperature}°C</h1>
            </div>
            <div>
                <h1 className='text-white text-5xl font-bold font-sans'>{data.city}</h1>
            </div>
            <div>
                <img src={icon_url} className='h-32' />
            </div>
            <div>
                <h1 className='text-white text-3xl font-bold font-sans'>{data.description}</h1>
            </div>

            <div className='flex items-end text-white gap-32 detail'>

                <div className='flex items-center gap-2'>
                    <div>
                        <WiHumidity className='text-6xl' />
                    </div>
                    <div className='flex flex-col items-start'>
                        <p className='text-lg'> {data.humidity}% </p>
                        <p className='text-lg'> Humidity</p>
                    </div>

                </div>

                <div className='flex items-center gap-3'>
                    <div>
                        <IoIosSpeedometer className='text-5xl' />
                    </div>
                    <div className='flex flex-col items-start'>
                        <p className='text-lg'> {Math.round(data.wind_speed*3.6*100)/100} km/hr</p>
                        <p className='text-lg'> Wind Speed</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Card