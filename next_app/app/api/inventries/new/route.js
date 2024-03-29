import Inventory from "@models/inventory";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { title,place, arrival,departure,price,comment,link, type,company,   userId} = await request.json();

    try {
        await connectToDB();
        const newInventory = new Inventory({ creator: userId, title,place, arrival,departure,price,comment,link, type ,company});

        await newInventory.save();
        return new Response(JSON.stringify(newInventory), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Inventory", { status: 500 });
    }
}
