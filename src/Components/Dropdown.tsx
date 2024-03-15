import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuOptionGroup,
  MenuItemOption,
  Box,
  Portal, // Import the Portal component
} from '@chakra-ui/react';
import { ChevronDownIcon, CheckIcon } from '@chakra-ui/icons';

export type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: Option[];
  placeholder?: string;
  selectedValue: string;
  onChange: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Select option',
  selectedValue,
  onChange,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState<string | number>('auto');

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth); 
    }
  }, []);

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} ref={buttonRef} className="rounded-md h-[35px] w-[300px] bg-[#d9d9d9] px-3 p-2">
            {options.find(option => option.value === selectedValue)?.label || placeholder}
          </MenuButton>
          <Portal> {/* Wrap MenuList in Portal */}
            <MenuList width={buttonWidth ? `${buttonWidth}px` : 'auto'} sx={{ background: '#d9d9d9', borderRadius: 'md', padding: '3', rounded: '8'}}>
              <MenuOptionGroup defaultValue={selectedValue} type="radio">
                {options.map(option => (
                  <MenuItemOption
                    key={option.value}
                    value={option.value}
                    onClick={() => onChange(option.value)}
                    icon={<></>}
                    sx={{
                      _hover: { bg: '#b0adad' },
                      marginBottom: '1',
                      rounded: '8'                 
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                     
                      {isOpen && selectedValue === option.value ? (
                      <>
                      <p className='font-bold'>{option.label}</p>
                      <CheckIcon color='green' mt={2} mr={10}/>
                      </>
                      ) : (option.label)}
                    </Box>
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Portal>
        </>
      )}
    </Menu>
  );
};


export default Dropdown;
