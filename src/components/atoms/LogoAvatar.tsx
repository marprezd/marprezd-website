// src/components/atoms/LogoAvatar.tsx
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Box,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import React from "react"

// Display the logo and the name of the website
export default function LogoAvatar() {
  return (
    <Box>
      <Link href="/" passHref>
        <Box
          as="span"
          display="flex"
          alignItems="center"
          gap="0.625rem"
        >
          <AvatarGroup>
            <Avatar.Root size="sm">
              <AvatarFallback name="Mario Pérez" />
              <AvatarImage alt="Mario Pérez" src="https://res.cloudinary.com/dieoeaoiy/image/upload/bo_0px_solid_rgb:ffffff,c_fill,f_auto,g_face:auto,h_32,o_100,q_auto:best,r_0,w_32/v1662047991/profile_uezzbj.jpg" />
            </Avatar.Root>
          </AvatarGroup>
          <Text
            as="span"
            display={{ base: "none", lg: "block" }}
            justifyContent="center"
            fontWeight="semibold"
            fontSize="lg"
          >
            marprezd
          </Text>
        </Box>
      </Link>
    </Box>
  )
}
