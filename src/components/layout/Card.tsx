import { motion } from "framer-motion"

type CardProps = {
    contentClassName?: string
    children: React.ReactNode
}

export default function Card(props: CardProps) {
    return <div className={`bg-secondary rounded-lg shadow-md p-4 text-text ${props.contentClassName}`}>
        {props.children}
    </div>

}

export function MotionCard(props: CardProps) {
    return <motion.div>
        <Card {...props} />
    </motion.div>
}

