'use client';
import React, { useEffect, useState, useMemo } from 'react';
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Image,
  Text
} from "@chakra-ui/react";
import Link from 'next/link';
import NotificationsModal from './components/NotificationModal';
import { AppSlice, useDispatch } from '@/lib/redux';

export default function Home() {
  const dispatch = useDispatch();
  
  // const [pulse, setPulse] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPulse((prevPulse) => !prevPulse);
  //   }, 800);
  //   return () => clearInterval(interval);
  // }, []);
  // useEffect(() => {
  //   if ("Notification" in window) {
  //     if (Notification.permission === "granted") {
  //       // Permission is already granted, no need to show a notification
  //     } else if (Notification.permission === "denied") {
  //       // User denied permission, handle as needed
  //     } else {
  //       dispatch(AppSlice.actions.toggleNotificationModal(true));
  //       // Permission is not granted; request it
  //       Notification.requestPermission()
  //       .then((permission) => {
  //         if (permission === "granted") {
  //           dispatch(AppSlice.actions.toggleNotificationModal(false));
  //           const notification = new Notification("Notifications Enabled", {
  //             body: "You have enabled notifications. Now you can receive real time updates.",
  //             icon: "/images/i13logo.png",
  //           });
  //         } else if (permission === "denied") {
  //           // User denied permission
  //         } else if (permission === "default") {
  //           // User closed the permission dialog without making a choice
  //         }
  //       });
  //     }
  //   }
  // }, []);

  return (
    <>
      <Flex
        h="100%"
        w="100%"
      >
        <Flex w="100%" direction="column" alignItems="center" px="2%" mt="1%" justify="center">
          <Flex
            direction="column"
            alignItems="center"
            width={'50vw'}
          >
            <Avatar
              size="xl"
              name="Bob The Builder"
              src="/images/bob.png"
            />
            <Divider my="6%" />
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="black"
              textAlign="center"
              m={5}>
              Hi! I'm Bob, your personal assistant👋.<br /> I'll be guiding you through your onboarding process.
            </Text>
            <Link href={'/createCompany'}>
              <Button
                size="md"
                variant="solid"
                colorScheme='green'
              >
                +&nbsp;Create Company
              </Button>
            </Link>
          </Flex>
        </Flex>
        <NotificationsModal />
      </Flex>
    </>
  )
}
