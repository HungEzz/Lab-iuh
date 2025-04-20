import chefify from '../assets/chefify.png'
import avatar from "../assets/avatar.png";
import list from '../assets/list_filter.png';
import slider from '../assets/slider.png'
import rating5 from '../assets/rating_5.png'
import rating4 from '../assets/rating_4.png'
import rating3 from '../assets/rating_3.png'
import rating2 from '../assets/rating_2.png'
import rating1 from '../assets/rating_1.png'
import nothing from '../assets/nothing.png'
import chefifywhite from '../assets/chefifywhite.png'
import { useEffect, useState } from 'react';
import { Recipe } from './Recipe';

const Chefify = () => {
    const [recipeList,setRecipeList]=useState([]);
    useEffect(()=>{
        fetch('https://67cd6670dd7651e464ee43e8.mockapi.io/Recipe')
            .then(res=>res.json())
            .then(data=>{
                setRecipeList(data)
            })
      },[])
    
    return (
        <div className="grid grid-cols-3 grid-rows-[auto,1fr,auto] w-full min-h-screen bg-white">
            {/* header */}
            <div className="col-span-3 flex border-b border-gray-200 p-4 sticky top-0 bg-white shadow-sm z-10">
                <div className="flex flex-[3] items-center gap-10">
                    <img src={chefify} className='w-auto h-12'/>
                    <div className="relative w-full">
                        <input type='text' className='w-full rounded-lg bg-gray-100 border-0 ps-5 py-2.5 pl-10 focus:ring-2 focus:ring-[var(--pink)]' placeholder='Search recipes...'/>
                       
                    </div>
                </div>
                <div className="flex flex-[4] px-5">
                    <div className='flex flex-[4] justify-around items-center'>
                        <a href='#' className='text-gray-700 text-base font-medium hover:text-[var(--pink)]'>What to cook</a>
                        <a href='#' className='text-gray-700 text-base font-medium hover:text-[var(--pink)]'>Recipes</a>
                        <a href='#' className='text-gray-700 text-base font-medium hover:text-[var(--pink)]'>Ingredients</a>
                        <a href='#' className='text-gray-700 text-base font-medium hover:text-[var(--pink)]'>Occasions</a>
                        <a href='#' className='text-gray-700 text-base font-medium hover:text-[var(--pink)]'>About Us</a>
                    </div>
                    <div className='flex flex-[2] gap-5 items-center'>
                        <button className='text-white text-base bg-[var(--pink)] rounded-md p-2 px-4 shadow-md hover:bg-[#e03a76] transition-all'>Your Recipe Box</button>
                        <img src={avatar} className="h-10 w-10 rounded-full border-2 border-[var(--pink)]"/>
                    </div>
                </div>
            </div>
            {/* menu */}
            <div className="flex justify-end pt-10 items-start border-r border-gray-200 bg-gray-50">
                <div className='border border-gray-200 rounded-lg flex-col items-start justify-start p-6 bg-white shadow-md mr-6'>
                    <h3 className='font-bold text-lg text-start mb-4'>FILTERS</h3>
                    <div className='flex flex-col'>
                        <div className='flex justify-between items-center pt-3'>
                            <h4 className='font-bold text-md text-gray-700'>Type</h4>
                            <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className='flex gap-10 py-6'>
                            <div className='flex flex-col gap-3 items-start'>
                                <label className='flex gap-2 items-center cursor-pointer'>
                                    <input type='checkbox' className="rounded text-[var(--pink)] focus:ring-[var(--pink)]"/>
                                    <span className="text-gray-700">Stir-fried</span>
                                </label>
                                <label className='flex gap-2 items-center cursor-pointer'>
                                    <input type='checkbox' className="rounded text-[var(--pink)] focus:ring-[var(--pink)]"/>
                                    <span className="text-gray-700">Roasted</span>
                                </label>
                                <label className='flex gap-2 items-center cursor-pointer'>
                                    <input type='checkbox' className="rounded text-[var(--pink)] focus:ring-[var(--pink)]"/>
                                    <span className="text-gray-700">Baked</span>
                                </label>
                                <label className='flex gap-2 items-center cursor-pointer'>
                                    <input type='checkbox' className="rounded text-[var(--pink)] focus:ring-[var(--pink)]"/>
                                    <span className="text-gray-700">Stewed</span>
                                </label>
                            </div>
                            <div className='flex flex-col gap-3 items-start'>
                                <label className='flex gap-2 items-center cursor-pointer'>
                                    <input type='checkbox' className="rounded text-[var(--pink)] focus:ring-[var(--pink)]"/>
                                    <span className="text-gray-700">Pan-fried</span>
                                </label>
                                <label className='flex gap-2 items-center cursor-pointer'>
                                    <input type='checkbox' className="rounded text-[var(--pink)] focus:ring-[var(--pink)]"/>
                                    <span className="text-gray-700">Grilled</span>
                                </label>
                                <label className='flex gap-2 items-center cursor-pointer'>
                                    <input type='checkbox' className="rounded text-[var(--pink)] focus:ring-[var(--pink)]"/>
                                    <span className="text-gray-700">Sauteed</span>
                                </label>
                                <label className='flex gap-2 items-center cursor-pointer'>
                                    <input type='checkbox' className="rounded text-[var(--pink)] focus:ring-[var(--pink)]"/>
                                    <span className="text-gray-700">Steamed</span>
                                </label>
                            </div>
                        </div>
                        <div className='flex flex-col py-6 border-t border-b border-gray-200 mx-[-1.5rem] px-6'>
                            <div className='flex justify-between items-center'>
                                <h4 className='font-bold text-md text-gray-700'>Time</h4>
                                <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <img src={slider} className='mt-4'/>
                        </div>
                        <div className='flex flex-col py-6'>
                            <div className='flex justify-between pb-4'>
                                <h4 className='font-bold text-md text-gray-700'>Rating</h4>
                                <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <label className='flex gap-2 items-center cursor-pointer'>
                                    <input type='checkbox' className="rounded text-[var(--pink)] focus:ring-[var(--pink)]"/>
                                    <img src={rating5}/>
                                </label>
                                <label className='flex gap-2 items-center cursor-pointer'>
                                    <input type='checkbox' className="rounded text-[var(--pink)] focus:ring-[var(--pink)]"/>
                                    <img src={rating4}/>
                                </label>
                                <label className='flex gap-2 items-center cursor-pointer'>
                                    <input type='checkbox' className="rounded text-[var(--pink)] focus:ring-[var(--pink)]"/>
                                    <img src={rating3}/>
                                </label>
                                <label className='flex gap-2 items-center cursor-pointer'>
                                    <input type='checkbox' className="rounded text-[var(--pink)] focus:ring-[var(--pink)]"/>
                                    <img src={rating2}/>
                                </label>
                                <label className='flex gap-2 items-center cursor-pointer'>
                                    <input type='checkbox' className="rounded text-[var(--pink)] focus:ring-[var(--pink)]"/>
                                    <img src={rating1}/>
                                </label>
                            </div>
                        </div>
                        <div className='flex items-center justify-center py-4 border-t border-gray-200 mx-[-1.5rem] px-6 mt-2'>
                            <button className='text-white rounded-md w-full py-3 font-medium shadow-md hover:shadow-lg transition-all duration-300' style={{background:'var(--pink)'}}>Apply Filters</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* content */}
            <div className='col-span-2 flex flex-col gap-6 pt-10 ps-10 pr-10 bg-white'>
                <div className='flex justify-between items-center mb-2'>
                    <h1 className='font-bold text-2xl text-gray-800'>Salad Recipes <span className="text-[var(--pink)] font-normal">(32)</span></h1>
                    <div className="relative inline-block w-40">
                        <select className='rounded-md border border-gray-300 w-full p-2 pr-8 appearance-none bg-white focus:border-[var(--pink)]'>
                            <option>Sort: A-Z</option>
                            <option>Sort: Z-A</option>
                            <option>Newest</option>
                            <option>Popular</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {recipeList.length > 0 ? (
                        recipeList.map((item,index)=>(
                            <Recipe key={index} item={item}/>
                        ))
                    ) : (
                        <div className="col-span-3 flex flex-col items-center justify-center py-16">
                            <img src={nothing} className="w-32 h-32 mb-4 opacity-70" />
                            <p className="text-gray-500 text-lg">No recipes found. Try adjusting your filters.</p>
                        </div>
                    )}
                </div>
            </div>
            {/* footer */}
            <div className="col-span-3 py-10 px-12 bg-gray-900 text-white mt-10">
                <div className="grid grid-cols-12 gap-8">
                    <div className='col-span-6'>
                        <div className='flex flex-col gap-6 max-w-xl'>
                            <h2 className='font-bold text-2xl mb-2'>About Us</h2>
                            <p className="text-gray-300 leading-relaxed">Welcome to Chefify, your culinary companion for exploring delicious recipes and learning to cook like a professional chef. Our platform offers a wide range of recipes for all skill levels.</p>
                            <div className='flex gap-3 mt-4'>
                                <input type='email' placeholder='Enter your email' className='p-4 bg-white border-0 rounded-md text-gray-800 flex-[6] focus:ring-2 focus:ring-[var(--pink)]'/>
                                <button className='flex-[1] rounded-md p-4 font-medium' style={{backgroundColor:'var(--pink)'}}>Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3 pl-8'>
                        <div className='flex flex-col gap-6'>
                            <h2 className='font-bold text-xl mb-4'>Learn More</h2>
                            <div className="space-y-3 flex flex-col">
                                <a href="#" className="text-gray-300 hover:text-white">Our Cooks</a>
                                <a href="#" className="text-gray-300 hover:text-white">Features</a>
                                <a href="#" className="text-gray-300 hover:text-white">FAQ</a>
                            </div>
                            <h2 className='font-bold text-xl mt-6 mb-4'>Shop</h2>
                            <div className="space-y-3 flex flex-col">
                                <a href="#" className="text-gray-300 hover:text-white">Gift Subscription</a>
                                <a href="#" className="text-gray-300 hover:text-white">Send us Feedback</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3 pl-8'>
                        <h2 className='font-bold text-xl mb-4'>Popular Recipes</h2>
                        <div className="space-y-3 flex flex-col">
                            <a href="#" className="text-gray-300 hover:text-white">What to Cook This Week</a>
                            <a href="#" className="text-gray-300 hover:text-white">Pasta</a>
                            <a href="#" className="text-gray-300 hover:text-white">Dinner</a>
                            <a href="#" className="text-gray-300 hover:text-white">Healthy</a>
                            <a href="#" className="text-gray-300 hover:text-white">Vegetarian</a>
                            <a href="#" className="text-gray-300 hover:text-white">Vegan</a>
                            <a href="#" className="text-gray-300 hover:text-white">Christmas</a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-10 pt-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src={chefifywhite} className="h-8" />
                        <p className="text-gray-400">© 2023 Chefify Company</p>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chefify;
