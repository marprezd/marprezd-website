"use client"

import { AppBar, Toolbar, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import { useColorScheme } from "@mui/material/styles"
import React from "react"

export default function AppHeader() {
  const { mode, setMode } = useColorScheme()

  if (!mode) {
    return null
  }

  return (
    <AppBar position="fixed" sx={{ bgcolor: "background.default", boxShadow: "none", borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="text.primary" component="div" sx={{ flexGrow: 1 }}>
          MARPREZD
        </Typography>
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          p={1}
          borderRadius={2}
        >
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-theme-toggle"
              name="theme-toggle"
              row
              value={mode}
              onChange={event =>
                setMode(event.target.value as "system" | "light" | "dark")}
            >
              <FormControlLabel value="system" control={<Radio />} label="System" />
              <FormControlLabel value="light" control={<Radio />} label="Light" />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
