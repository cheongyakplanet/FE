"use client";

import { useAllPostStore } from "@/stores/community";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { useEffect } from "react";

export default function community() {
  const {contents, allPost} = useAllPostStore();

  useEffect(() => {
  allPost();
  }, [contents])

  return (
    <div>
    {contents.map((content, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle>{content.title}</CardTitle>
        </CardHeader>
      </Card>
    ))}
    </div>
  )


    // <Card>
    //   {contents.map((content) => (
    //     <CardHeader>
    //     <CardTitle>{content.title}</CardTitle>
    //   </CardHeader>
    //   ))}
    // </Card>;
}
