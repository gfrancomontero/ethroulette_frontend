import React from 'react'
import { Button } from '@nextui-org/react'
import styles from './ColorPicker.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedColor } from '@/redux/slices/betSlice';

export default function ColorPicker() {
  const selectedColor = useSelector((state) => state.bet.selectedColor)
  const dispatch = useDispatch();
  
  return (
    <div className="flex justify-center mt-2 mb-2">
      {['red', 'black'].map((color) => (
        <Button
          key={color}
          onPress={() => dispatch(setSelectedColor(color))}
          className={`${styles[color]} ${styles.colorOption} ${
            selectedColor === color && styles.selected
          }`}
        >
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </Button>
      ))}
    </div>
  )
}
