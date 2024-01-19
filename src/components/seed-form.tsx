import yup from "@/pods/common/yup";
import { INITIAL_OPTIONS } from "@/pods/crypto/atoms/options";
import { useGeneratorOptionsHandlers } from "@/pods/crypto/hooks/use-generator-options";
import { Input } from "@nextui-org/react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import FormikControl from "./formik-control";

const validationSchema = yup.object().shape({
  tokensByModule: yup.number().required().min(1),
  tokenLength: yup.number().required().min(1),
  modulesCount: yup.number().required().min(1),
  seed: yup.string().required(),
});


const Menu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const timer = useRef<number | null>(null);
  const options = useGeneratorOptionsHandlers();
  return (
    <Formik
      initialValues={INITIAL_OPTIONS}
      validationSchema={validationSchema}
      onSubmit={options.set}
    >
      {({ submitForm }) => {
        const delaySubmit = () => {
          if (timer.current) {
            clearTimeout(timer.current);
          }
          timer.current = window.setTimeout(submitForm, 200);
        };
        return (
          <Form className="flex flex-col gap-2">
            <div className="flex gap-4 content-center">
              <FormikControl
                size="sm"
                Input={Input}
                name="seed"
                label="Seed"
                type={isVisible ? "text" : "password"}
                startContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeOpenIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeClosedIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                onKeyDown={delaySubmit}
              />
            </div>
            <div className="flex gap-2 flex-col md:flex-row">
              <FormikControl
                type="number"
                size="sm"
                name="tokensByModule"
                Input={Input}
                left
                label="Tokens by module"
                onKeyDown={delaySubmit}
              />
              <FormikControl
                type="number"
                size="sm"
                name="tokenLength"
                Input={Input}
                label="Token lenght"
                onKeyDown={delaySubmit}
              />
              <FormikControl
                type="number"
                size="sm"
                name="modulesCount"
                Input={Input}
                label="Count of modules"
                onKeyDown={delaySubmit}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Menu;
