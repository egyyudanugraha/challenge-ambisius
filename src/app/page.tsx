import MenuSection from "@/components/custom/section/MenuSection"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Home = () => {
  return (
    <div className="flex justify-center p-4">
      <Card className="w-[90%] md:w-[80%] lg:w-[70%]">
        <CardHeader>
          <CardTitle>Sistem Restoran</CardTitle>
          <CardDescription>Ambisius Coding Challenge #230916H</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="flex gap-2">
              <TabsTrigger value="menu" className="w-full">Menu</TabsTrigger>
              <TabsTrigger value="order" className="w-full">Order</TabsTrigger>
              <TabsTrigger value="dapur" className="w-full">Dapur</TabsTrigger>
              <TabsTrigger value="kasir" className="w-full">Kasir</TabsTrigger>
            </TabsList>
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
