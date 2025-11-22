import React from "react";
import ServicePage from "./ServicePage";

export default async function page({ params }: { params: { type: string } }) {
    const { type } = await params;
    return (
        <ServicePage type={type} />
    );
}
