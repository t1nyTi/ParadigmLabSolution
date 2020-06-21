import React from 'react';
import { Flex, Box, Text, Input, useClipboard } from '@blockstack/ui';
import { ChainIcon } from './icons/chain';
import { useConnect } from '@blockstack/connect';
import { PublicUrlRegistrar } from './PublicUrlRegistrar';

export const Sharer = ({ togglePublic, isPublic }) => {
  const { authOptions } = useConnect();
  const { userSession } = authOptions;
  const { username } = userSession.loadUserData();
  const url = `${document.location.origin}/todos/${username}`;
  const { onCopy } = useClipboard(url);
  return (
    <Box
      width="100%"
      px={4}
      py={4}
      borderColor="ink.200"
      borderWidth="1px"
      borderRadius="8px"
      my={4}
    >
      <Flex flexWrap="wrap">
        {isPublic ? (
          <>
            <Box width="100%">
              <Flex>
                <Box flexGrow={1}>
                  <Text fontWeight="500" display="block" fontSize={1} mb={1}>
                    Share your to-do's
                  </Text>
                  <Input value={url} readOnly isDisabled backgroundColor="#F0F0F5" />
                </Box>
                <Box pl={4}>
                  <Text
                    color="blue"
                    cursor="pointer"
                    fontSize={1}
                    fontWeight="500"
                    onClick={() => {
                      onCopy();
                    }}
                  >
                    Copy Link
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box width="100%" mt={5}>
              <Flex>
                <Box>
                  <ChainIcon />
                </Box>

                <Box px={3}>
                  <Text fontWeight="500" display="block" mb={0} fontSize={2}>
                    Public
                  </Text>
                  <Text fontSize={0}>Anyone with the link can access</Text>
                  <Text
                    color="blue"
                    cursor="pointer"
                    fontSize={0}
                    fontWeight="500"
                    display="inline-block"
                    pl={3}
                    onClick={() => {
                      togglePublic();
                    }}
                  >
                    Make private
                  </Text>
                </Box>
                <Box px={3}>
                  <PublicUrlRegistrar userSession={userSession} />
                </Box>
              </Flex>
            </Box>
          </>
        ) : (
          <>
            <Box>
              <ChainIcon />
            </Box>
            <Box flexGrow={1} px={3}>
              <Text fontWeight="500" display="block" mb={0} fontSize={1}>
                Share your to-do's
              </Text>
              <Text fontSize={1}>Make your list public to share it with others</Text>
            </Box>
            <Box>
              <Text
                color="blue"
                cursor="pointer"
                fontSize={1}
                fontWeight="500"
                onClick={() => {
                  togglePublic();
                }}
              >
                Make public
              </Text>
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
};
