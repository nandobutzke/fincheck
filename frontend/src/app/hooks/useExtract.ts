import { useMutation } from "@tanstack/react-query";
import { pdfService } from "../../services/pdfService";

export function useExtract() {
  const { mutateAsync: generateExtract } = useMutation({
    mutationFn: pdfService.generateExtract
  })

  return {
    generateExtract
  }
}
