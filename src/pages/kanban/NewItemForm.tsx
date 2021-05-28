import React, {useRef, useState} from "react"
import { NewItemFormContainer, NewItemButton, NewItemInput, PaddingSmall } from "./styles"
import {useFocus} from "./utils/useAutoFocus";
import Button from "../../components/Button/button";
import Input from "../../components/Input/input";

type NewItemFormProps = {
  onAdd(text: string): void
}
export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState<string>("")
  const handleAddText = (
      event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" ) {
      onAdd(text)
    }
  }
  return (
      <NewItemFormContainer>
        <PaddingSmall>
          <Input
              inputSize={"thin"}
              autoFocus={true}
              value={text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value && setText(e.target.value.trim())}
              onKeyPress={handleAddText}

          />
        </PaddingSmall>
        <Button btnType={'primary'} size={"tiny"} onClick={() => onAdd(text)}>
          Create
        </Button>
      </NewItemFormContainer>
  )
}

