import React from 'react'
import "./ContaUs.scss"



const ContaUs = () => {
  return (
    <div className='contact-in'>
        <div className='contact-map'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533549.3134597987!2d-9.568597891583208!3d32.00408592549311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b88619651c58d%3A0xd9d39381c42cffc3!2sMorocco!5e0!3m2!1sen!2sma!4v1723719920541!5m2!1sen!2sma"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <h1>CONTACT US</h1>
            <form>
                <input type='text' placeholder='Name' class="contact-form-txt"/>
                <input type='text' placeholder='Email' class="contact-form-txt"/>
                <textarea placeholder='Message' class="contact-form-textarea"></textarea>
                <input className='btn' type='submit' name='Submit'/>
               
            </form>
        </div>
    </div>
  )
}

export default ContaUs;