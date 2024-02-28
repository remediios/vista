import { createDescription } from '@/app/actions';
import ButtonBar from '@/app/components/ButtonBar';
import Counter from '@/app/components/Counter';
import { Card, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const DescriptionPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight">
          Please describe your home in great detail!
        </h2>
      </div>
      <form action={createDescription}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-3">
            <Label className="text-md">Title</Label>
            <Input
              name="title"
              type="text"
              required
              placeholder="Short and simple..."
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="text-md">Description</Label>
            <Textarea
              name="description"
              required
              placeholder="Please describe your home..."
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="text-md">Price</Label>
            <Input
              name="price"
              type="number"
              required
              placeholder="Price per night in EUR €"
              min={10}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="text-md">Image</Label>
            <Input name="image" type="file" required />
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-y-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Guests</h3>
                  <p className="text-muted-foreground text-sm">
                    How many guest do you want?
                  </p>
                </div>
                <Counter counterType="guestCounter" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Bedrooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many rooms are you renting?
                  </p>
                </div>
                <Counter counterType="roomCounter" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Bathrooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many bathrooms does your home have?
                  </p>
                </div>
                <Counter counterType="bathroomCounter" />
              </div>
            </CardHeader>
          </Card>
        </div>
        <ButtonBar />
      </form>
    </>
  );
};

export default DescriptionPage;
