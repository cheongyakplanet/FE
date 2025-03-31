import { useMutation } from "@tanstack/react-query"
import { POST_findPw } from "../api"

export const usePostFindPw = () => {
  return useMutation({
    mutationKey: [POST_findPw.name],
    mutationFn: POST_findPw,
  })
}