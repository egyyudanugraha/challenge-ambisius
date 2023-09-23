import ResetButton from "@/components/custom/ResetButton";
import MenuSection from "@/components/custom/section/MenuSection"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Globe } from 'lucide-react';
import Link from "next/link"

const Home = () => {
  return (
    <div className="flex justify-center p-4">
      <Card className="w-[90%] md:w-[80%] lg:w-[70%]">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <CardTitle>Sistem Restoran</CardTitle>
              <CardDescription>Ambisius Coding Challenge #230916H</CardDescription>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-xs text-slate-500 md:items-end">
                <span>Created for Coding Challenge at </span>
                <Link className="font-semibold hover:underline" href="https://ambisius.com/" target="_blank">Ambisius Lab</Link>
                <span> - By </span>
                <Link className="font-semibold hover:underline" href="https://egyyudanugraha.site/" target="_blank">egyyudanugraha</Link>
              </div>
              <div className="flex gap-2 justify-end">
                <Link 
                  target="_blank"
                  href="https://github.com/egyyudanugraha/challenge-ambisius/"
                >
                  <Github color="#27272a" size={16} />
                </Link>
                <Link 
                  target="_blank"
                  href="https://egyyudanugraha.site/"
                >
                  <Globe color="#27272a" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="menu" className="w-full">
            <div className="flex gap-2 w-full">
              <TabsList className="flex gap-2 w-full">
                <TabsTrigger value="menu" className="w-full">Menu</TabsTrigger>
                <TabsTrigger value="order" className="w-full">Order</TabsTrigger>
                <TabsTrigger value="dapur" className="w-full">Dapur</TabsTrigger>
                <TabsTrigger value="kasir" className="w-full">Kasir</TabsTrigger>
              </TabsList>
              <ResetButton />
            </div>
            <TabsContent value="menu">
              <MenuSection />
            </TabsContent>
            <TabsContent value="order">Order</TabsContent>
            <TabsContent value="dapur">Dapur</TabsContent>
            <TabsContent value="kasir">Kasir</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
