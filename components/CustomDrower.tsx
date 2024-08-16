import { ModalContext } from '@/context/ModalContext';
import { Drawer } from '@mui/material';
import React, { useContext } from 'react'
interface drowerProps {
  openContentNote?: boolean;
  toggleOpenContentNote?: () => any;
  children:React.ReactNode,
  open?:boolean,
  onClose?: () => void;
}

const CustomDrower = ({openContentNote,toggleOpenContentNote , children, onClose, open}:drowerProps) => {
  const { toggle, isOpen } = useContext<any>(ModalContext);

  return (
    <Drawer
    anchor="right"
    open={open}
    onClose={onClose}
    sx={{
      "& .MuiDrawer-paper": {
        width: { xs: "85%", sm: "85%", md: "40%" },
      },
      p: "10px",
    }}
    ModalProps={{ keepMounted: false, disableEnforceFocus: true }}>
      {children}
  </Drawer>

  )
}

export default CustomDrower