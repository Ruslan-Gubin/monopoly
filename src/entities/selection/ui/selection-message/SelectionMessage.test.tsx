import { getByText, render } from "@testing-library/react";
import { useViewer } from "@/entities/viewer";
import { MessageModel } from "@/features";
import { SelectionMessage } from "./SelectionMessage";

jest.mock("@/entities/viewer");

describe("SelectionMessage component", () => {
  const message: MessageModel = {
    authorId: "123",
    createdAt: "2023-06-16",
    fullName: "Иван Иванов",
    image: "img.jpg",
    text: "Привет",
    updatedAt: "2023-06-16",
    __v: 0,
    _id: "1",
  };

  it("should apply styles for my message if I am the author", () => {
    (useViewer as jest.Mock).mockReturnValue({ authId: "123" });

    const { getByText } = render(
      <SelectionMessage message={message} /> 
    );
    const text = message.text
    const messageElement = getByText(text);
    expect(messageElement).toBeInTheDocument();
  });
});
