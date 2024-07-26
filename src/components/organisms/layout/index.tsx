"use client";

import { Box } from "@mui/material"

import { Draw } from "../draw"
import { Header } from "../header"
import { DrawContextProvider } from "./context"

export const LayoutDashboard = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
        <DrawContextProvider>
          <Header />
          <Draw />
        </DrawContextProvider>
    </Box>
  )
}