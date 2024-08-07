"use client";
import React, { useState } from "react";
import ReactPlayer from 'react-player/youtube'
import { cn } from "@/lib/utils";

import { X } from "lucide-react";
import { Icon } from "@iconify/react";
import Image from "next/image";
// import thumbnail from "@/public/images/all-img/thumbnail.png";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import logo_ads from "public/images/utility/comming-soon-light.png";

const AddBlock = ({
  className,
  image = logo_ads,
  title = "I have a nyc day",
  desc = " Alcarz Information System",
}) => {
  const [openVideo, setOpenVideo] = useState(false);
  return (
    <>
      <div
        className={cn(
          "bg-primary dark:bg-default-400 text-primary-foreground pt-5 pb-4 px-4  rounded  m-3 hidden xl:block",
          className
        )}
      >
        <div className={cn("text-base font-semibold text-primary-foreground")}>
          {" "}
          {title}
        </div>
        <div className={cn(" text-sm text-primary-foreground")}>{desc}</div>
        <div className="mt-4 relative">
          <Image src={image} alt="footer-thumbnail" className="w-full h-full" />
          <Button
            size="icon"
            type="button"
            color="secondary"
            className="rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40"
            onClick={() => setOpenVideo(true)}
          >
            <Icon
              icon="heroicons:play-16-solid"
              className="w-5 h-5 text-white"
            />
          </Button>
        </div>
        <div className="text-sm font-semibold  text-primary-foreground flex items-center gap-2 mt-4">
          Upgrade Now
          <Icon icon="heroicons:arrow-long-right" className="w-5 h-5" />{" "}
        </div>
      </div>
      <Dialog open={openVideo}>
        <DialogContent size="lg" className="p-0" hiddenCloseIcon>
          <Button
            size="icon"
            onClick={() => setOpenVideo(false)}
            className="absolute text-gray-300  bg-default-900"
          >
            <X className="w-6 h-6" />
          </Button>
          <ReactPlayer url='https://www.youtube.com/watch?v=Zx31bB2vMns' />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddBlock;




