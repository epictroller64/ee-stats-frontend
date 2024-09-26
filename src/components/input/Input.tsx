import { forwardRef, InputHTMLAttributes } from "react"


const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(props, ref) {
    return <input {...props} ref={ref} className="bg-white border-primary focus:ring-primary text-black rounded-full p-2 min-w-[20vw] focus-visible:outline-none focus-visible:ring-2 transition-all duration-300" />
})

Input.displayName = "Input"
export default Input
