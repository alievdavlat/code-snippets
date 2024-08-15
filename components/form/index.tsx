import { useContext, useEffect } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { hanldeRequest } from "../../configs/req";
import { toast } from "sonner";
import { RandomContext } from "../../context/RandomContext";
import { Box } from "@mui/system";
import useQueryParams from "@/hooks/useQueryParams";

export interface IChildrenProps {
  createInfo: any;
  getInfo: any;
  handleFinish: (values: any, type?: string) => void;
  form: UseFormReturn;
  isSuccess: any;
  isError: any;
  isLoading?: any;
}

export interface ICollectionForm {
  children: (props: IChildrenProps) => JSX.Element;
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
  initialValues?: any;
  url: string;
  getUrl?: string;
  validationSchema: any;
  id?: number | string;
  method?: string;
  clearable?: boolean;
  onGetSuccess?: (data: any) => void;
  withOutIdOnpUt?: boolean;
  name?: string;
  isClearble?: boolean;
  resetData?: boolean;
}

const getErrors = (error: any) => {
  if (error?.message === "Bad request!") {
    if (Object.keys(error?.data)?.length) {
      let errors: any = error?.data;

      Object.keys(error?.data)?.forEach((key) => {
        errors = {
          ...errors,
          [key]: {
            message: error?.data?.[key]?.[0],
            ref: { name: key },
            type: "request",
          },
        };
      });

      return errors;
    } else {
      return {};
    }
  } else {
    return {};
  }
};

export default function Form(props: ICollectionForm) {
  const { setRandom } = useContext<any>(RandomContext);
  const query = useQueryParams();

  const form = useForm({
    defaultValues: props.initialValues,
    resolver: yupResolver(props.validationSchema),
  });

  const { reset, setError } = form;

  const getInfo = useQuery({
    queryFn: async () => {
      const response = await hanldeRequest({
        url: props.getUrl,
        method: "GET",
      });

      return response.data;
    },
    queryKey: [props.getUrl],
    enabled: !!props.getUrl,
  });

  useEffect(() => {
    if (getInfo.isSuccess) {
      if (getInfo?.data?.data) {
        const transformedData = getInfo?.data?.data?.tags.map(
          (item: any) => item.name
        );

        reset(getInfo?.data?.data);
      } else if (getInfo?.data) {
        reset(getInfo?.data);
      }
      if (props.onGetSuccess) {
        props.onGetSuccess(getInfo?.data?.data);
      }
    }
    if (props.method === "POST") {
      reset();
    }
  }, [getInfo.isSuccess, getInfo?.data?.data]);

  const createInfo = useMutation({
    mutationFn: async (data: any) => {
      const response = await hanldeRequest({
        url:
          query.has("id") && !props.withOutIdOnpUt
            ? props.url + "/" + query.get("id")
            : props.url,
        data: data,
        method: props.method ? props.method : props.getUrl ? "PUT" : "POST",
      });

      return response?.data;
    },
    onSuccess(data) {
      setRandom(Math.random());
      if (props.clearable) {
        reset(props.initialValues);
      }
      props.onSuccess
        ? props.onSuccess(data)
        : () => {
            toast.success(props.getUrl ? "Updated" : "Created");
          };
    },
    onError(error: any) {
      if (Object.keys(getErrors(error.response?.data))?.length) {
        Object.keys(getErrors(error.response?.data))?.forEach((key) =>
          setError(key, getErrors(error.response?.data)?.[key])
        );
      }
      props.onError
        ? props.onError(error)
        : toast.error(String(error.response?.data?.message || error?.message));
    },
  });

  const { mutate: create, isError, isSuccess } = createInfo;

  async function handleFinish(values: any) {
    create({ ...values });
  }

  return (
    <Box>
      {props.children({
        createInfo,
        getInfo,
        handleFinish,
        form,
        isError,
        isSuccess,
      })}
    </Box>
  );
}
