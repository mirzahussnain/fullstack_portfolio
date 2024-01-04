import { useContext,useState } from 'react'
import contactMe from '../../../assets/images/contact-img.svg'
import { AppContext } from '../../../utils/context/store'
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_BASE_URL;
const Contact = () => {
    const {theme:[theme]}=useContext(AppContext)
    const [buttonText, setButtonText] = useState('Send');
  
    const [contactDetails,setContactDetails]=useState({
        name:"",subject:"",email:"",message:""
    })

const handleChange=(e)=>{
    e.preventDefault();
    const {name,value}=e.target
    setContactDetails({
        ...contactDetails,
        [name]:value
    })
   
}

const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
        setButtonText(`Sending...`)
        document.querySelector(".submit-button").classList.add("disabled")
        const response=await axios.post(`${BASE_URL}contact`,
        contactDetails,
        {
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials: true
        });
        if(response?.status==='200')
        {
            alert(response?.data?.message)
        }
        else{
            throw new Error(response?.data?.message)
        }
        
    } catch (error) {
        alert(error.message)
    }
    finally{
        setButtonText(`Send`)
        document.querySelector(".submit-button").classList.remove("disabled")
    }

}
  return (
    <section name="contact" className={`contact ${theme==='dark'?`bg-black`:`
    bg-white`} flex flex-col justify-center items-center relative
    z-[1]`} id="contact">
    <div className={`w-full max-w-[1350px] pt-[0.625rem] pr-0 pb-[6.25rem] pl-0 gap-3 relative flex flex-col justify-between items-center bg-cover bg-no-repeat
    ${theme==='dark'?`bg-dark_about_bg bg-right-top`:`
    bg-light_about_bg bg-top`}`}>

    <div className={`text-[2.625rem] text-center font-semibold font-CentraNo2 mt-5 max-md:mt-3 max-md:text-[2rem]
   ${
    theme === "dark"
      ? "bg-gradient-to-r from-purple-500 via-purple-500 to-indigo-700  "
      : "bg-gradient-to-r from-teal-700 via-teal-400 to-teal-500 "
  } bg-clip-text text-transparent 
   `}>
   Get In Touch
   </div>
   <div className={`text-lg text-center font-CentraNo2 max-w-[37.5rem] max-md:mt-3 max-md:text-[1rem] max-sm:px-10
   ${theme==='dark'?'text-neutral-400':'text-neutral-600'}`}>
   Get in Touch and Let the Joyful Collaboration Begin: Your Message Sparks My Creativity!
   </div>
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center max-lg:flex-wrap">
        <div className="w-[32rem] max-md:w-7/12 max-md:my-3">
          <img src={contactMe} alt="contactMe image" className="w-full" />
        </div>
  
        <div className="w-full md:w-6/12 px-4 flex flex-col items-center">
        <p className={`text-lg text-center max-w-[37.5rem] my-2 max-md:text-[1rem]
        ${theme==='dark'?'text-neutral-400':'text-neutral-600'}`}>Please write down your details:</p>
          <form   className="w-[32rem] max-md:w-[20rem] max-lg:[20rem] space-y-4"
          onSubmit={(e)=>handleSubmit(e)}>
            <div className="flex flex-col justify-center gap-4">
              <div className={`rounded-md`}>
                <input
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  value={contactDetails.subject}
                  required
                  className={`w-full p-2 border border-gray-300 rounded-md outline-none 
                  ${theme==='dark'?'focus:bg-fuchsia-400/30 focus:text-neutral-300 focus:border-purple-500':'focus:bg-teal-300/30 focus:text-neutral-600 focus:border-teal-400'}
                  transition-colors ease-in-out duration-500`}
                  onChange={(e)=>handleChange(e)}
                  />
              </div>
              <div className="">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={contactDetails.name}
                  required
                  className={`w-full p-2 border border-gray-300 rounded-md outline-none
                  ${theme==='dark'?'focus:bg-fuchsia-400/30 focus:text-neutral-300 focus:border-purple-500':'focus:bg-teal-300/30 focus:text-neutral-600 focus:border-teal-400'}
                  transition-colors ease-in-out duration-500`}
                  onChange={(e)=>handleChange(e)}
                />
              </div>
              <div className="">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  name="email"
                  value={contactDetails.email}
                  required
                  className={`w-full p-2 border border-gray-300 rounded-md outline-none
                  ${theme==='dark'?'focus:bg-fuchsia-400/30 focus:text-neutral-300 focus:border-purple-500':'focus:bg-teal-300/30 focus:text-neutral-600 focus:border-teal-400'}
                  transition-colors ease-in-out duration-500`}
                  onChange={(e)=>handleChange(e)}
                />
              </div>
              <div className="">
                <textarea
                  rows="6"
                  placeholder="Your Message"
                  name="message"
                  value={contactDetails.message}
                  required
                  className={`w-full p-2 border border-gray-300 rounded-md outline-none
                  ${theme==='dark'?'focus:bg-fuchsia-400/30 focus:text-neutral-300 focus:border-purple-500':'focus:bg-teal-300/30 focus:text-neutral-600 focus:border-teal-400'}
                  transition-colors ease-in-out duration-500`}
                  onChange={(e)=>handleChange(e)}
                />
                <button type="submit" className="submit-button mt-2 px-12 max-lg:px-7 max:md-px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">{buttonText}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  </section>
  
  )
}

export default Contact