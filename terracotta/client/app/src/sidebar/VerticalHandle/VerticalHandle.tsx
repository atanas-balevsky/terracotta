import React, { useState, useEffect, useCallback, FC } from 'react'
import Handle from './Handle'


interface Props{
	boxWidth: number,
	onDrag: (w: number) => void,
	minSize?: number,
	minMapSize?: number
}

const VerticalHandle: FC<Props> = ({
	boxWidth,
	onDrag,
	minSize = 0,
	minMapSize = 20/100 * window.innerWidth
}) => {

	const [ isDragging, setIsDragging ] = useState(false)
	const [ initialWidth, setInitialWidth ] = useState(minSize * 2)

	const handleMouseMove = useCallback(e => {

		const windowWidth = window.innerWidth
		const w = e.clientX < minMapSize ?
			windowWidth - minMapSize :
			windowWidth - e.clientX

		onDrag(w)

	}, [ onDrag, minMapSize ])

	const handleMouseDown = useCallback(e => {

		setIsDragging(true)
		const w = window.innerWidth - e.clientX
		setInitialWidth(initialWidth < minSize ? minSize : w)

	}, [  initialWidth, minSize ])

	const handleMouseUp = useCallback(() => {

		if (boxWidth < minSize) {

			onDrag(initialWidth)

		}

		if(boxWidth < 300){
			onDrag(0)
		}

		setIsDragging(false)

	}, [ boxWidth, initialWidth, onDrag, minSize ])

	useEffect(() => {

		const remove = () => {

			window.removeEventListener('mousemove', handleMouseMove)
			window.removeEventListener('mouseup', handleMouseUp)
			window.removeEventListener('mousedown', handleMouseDown)

		}

		const add = () => {

			window.addEventListener('mousedown', handleMouseDown)
			window.addEventListener('mousemove', handleMouseMove)
			window.addEventListener('mouseup', handleMouseUp)

		}

		if (isDragging) add()
		else remove()

		return remove

	}, [ isDragging, handleMouseMove, handleMouseDown, handleMouseUp ])

	return (
		<Handle
			onMouseDown={handleMouseDown}
			onMouseUp={() => setIsDragging(false)}
			isCollapsed={boxWidth < 10}
			onClickExpand={() => onDrag(30/100 * window.innerWidth)}
		/>
	)

}

export default VerticalHandle
