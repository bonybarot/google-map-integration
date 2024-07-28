import EHeader from '@commonComponents/EHeader';
import EText from '@commonComponents/EText';
import FormSelect from '@fields/FormSelect';
import { useAppSelector } from '@store/index';
import { themeSelector } from '@store/reducers/theme.reducer';
import { allGender } from '@utils/constant';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { moderateScale } from 'src/common/constants';

const ListOfDataPage = () => {
  const { current } = useAppSelector(themeSelector);
  const [detailedInfo, setdetailedInfo] = useState(null);
  const [remarkEnabled, setRemarkEnabled] = useState(null);
  const { control, reset } = useForm({});
  const menu = [
    {
      status: 'Paid',
      id: 1,
    },
    {
      status: 'Paid',
      id: 2,
    },
    {
      status: 'Unpaid',
      id: 3,
    },
    {
      status: 'Paid',
      id: 4,
    },
    {
      status: 'Unpaid',
      id: 5,
    },
    {
      status: 'Paid',
      id: 6,
    },
    {
      status: 'Unpaid',
      id: 7,
    },
    {
      status: 'Paid',
      id: 8,
    },
    {
      status: 'Unpaid',
      id: 9,
    },
    {
      status: 'Paid',
      id: 10,
    },
  ];
  const onView = (item: any) => {
    reset();
    if (detailedInfo === item.id) {
      setdetailedInfo(null);
    } else if (remarkEnabled === item.id) {
      setRemarkEnabled(null);
      setdetailedInfo(item.id);
    } else {
      setRemarkEnabled(null);
      setdetailedInfo(item.id);
    }
  };
  const onViewRemark = (item: any) => {
    reset();
    if (remarkEnabled === item.id) {
      setRemarkEnabled(null);
    } else if (detailedInfo === item.id) {
      setdetailedInfo(null);
      setRemarkEnabled(item.id);
    } else {
      setdetailedInfo(null);
      setRemarkEnabled(item.id);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <EHeader title="Details" />
      <FlatList
        data={menu}
        contentContainerStyle={{
          paddingHorizontal: moderateScale(10),
        }}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => onView(item)}
                activeOpacity={0.8}
                style={{
                  // height: moderateScale(100),
                  // borderWidth: 1,
                  borderRadius: moderateScale(5),
                  flexDirection: 'row',
                  elevation: moderateScale(6),
                  marginVertical: moderateScale(7),
                  backgroundColor: 'white',
                  overflow: 'hidden',
                }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View
                    style={{
                      // borderWidth: 1,
                      paddingVertical: moderateScale(10),
                      flex: 1,
                      // alignItems: 'center',
                      justifyContent: 'space-around',
                      paddingStart: moderateScale(10),
                      backgroundColor: '#DCFBF1',
                    }}>
                    <EText type="b16" color={current.new_primary}>
                      Group ID{' '}
                    </EText>
                    <EText type="b16" color={current.new_primary}>
                      Members
                    </EText>
                    <EText type="b16" color={current.new_primary}>
                      TOS
                    </EText>
                    <EText type="b16" color={current.new_primary}>
                      Location
                    </EText>
                  </View>
                  <View
                    style={{
                      // borderWidth: 1,
                      flex: 2,
                      // alignItems: 'center',
                      justifyContent: 'space-around',
                      paddingStart: moderateScale(10),
                      paddingVertical: moderateScale(10),
                    }}>
                    <EText type="b16" color={current.new_primary}>
                      GRPAFS00001
                    </EText>
                    <EText type="b16" color={current.new_primary}>
                      7
                    </EText>
                    <EText type="b16" color={current.new_primary}>
                      45000 Rs.
                    </EText>
                    <EText type="b16" color={current.new_primary}>
                      Ahmedabad
                    </EText>
                  </View>
                </View>
                <View style={{ width: moderateScale(70) }}>
                  <View
                    style={{
                      paddingHorizontal: moderateScale(10),
                      padding: moderateScale(3),
                      // borderWidth: 1,
                      // height: moderateScale(20),
                      borderRadius: 5,
                      margin: -1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor:
                        item.status === 'Paid' ? '#DCFBF1' : '#FAE2E2',
                    }}>
                    <EText
                      // style={{ margin: 5 }}
                      type="b14"
                      color={
                        item.status === 'Paid' ? current.new_primary : 'red'
                      }>
                      {item.status}
                    </EText>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      // borderWidth: 1,
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    {detailedInfo !== item.id && remarkEnabled !== item.id ? (
                      <SimpleLineIcons
                        name={'arrow-right'}
                        size={moderateScale(18)}
                        style={{
                          alignSelf: 'center',
                          color: current.new_primary,
                          margin: 5,
                        }}
                      />
                    ) : (
                      <SimpleLineIcons
                        name={'arrow-down'}
                        size={moderateScale(18)}
                        style={{
                          alignSelf: 'center',
                          color: current.new_primary,
                          margin: 5,
                        }}
                      />
                    )}
                    <TouchableOpacity onPress={() => onViewRemark(item)}>
                      <MaterialCommunityIcons
                        name={'message-processing-outline'}
                        size={moderateScale(25)}
                        style={{
                          alignSelf: 'center',
                          color: current.new_primary,
                          margin: 5,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
              {detailedInfo === item.id && (
                <View
                  style={{
                    elevation: 3,
                    borderWidth: 1,
                    borderColor: current.grayScale3,
                    // //   height: 150,
                    marginTop: moderateScale(-6),
                    borderBottomEndRadius: 10,
                    borderBottomStartRadius: 10,
                    backgroundColor: 'white',
                  }}>
                  <FlatList
                    data={[
                      { id: 1 },
                      { id: 2 },
                      { id: 3 },
                      { id: 4 },
                      { id: 5 },
                      { id: 6 },
                      { id: 7 },
                    ]}
                    renderItem={({ item: item1 }) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            paddingVertical: 10,
                            alignItems: 'center',
                          }}>
                          <EText type="m16" color={current.new_primary}>
                            GRPAFS001
                          </EText>
                          <EText type="m16" color={current.new_primary}>
                            Aman Shah
                          </EText>
                          <EText type="m16" color={current.new_primary}>
                            9638862350
                          </EText>
                          <View
                            style={{
                              width: moderateScale(25),
                              marginLeft: moderateScale(-8),
                            }}>
                            {item1.id === 1 && (
                              <Entypo
                                name={'flag'}
                                size={moderateScale(20)}
                                style={{
                                  alignSelf: 'center',
                                  color: current.new_primary,
                                  //   margin: 5,
                                }}
                              />
                            )}
                          </View>
                        </View>
                      );
                    }}
                  />
                </View>
              )}
              {remarkEnabled === item.id && (
                <View
                  style={{
                    elevation: 3,
                    borderWidth: 1,
                    borderColor: current.grayScale3,
                    // height: 150,
                    marginTop: moderateScale(-6),
                    borderBottomEndRadius: 10,
                    borderBottomStartRadius: 10,
                    backgroundColor: 'white',
                    // paddingTop: 10,
                  }}>
                  <View style={{ flex: 1, margin: 10 }}>
                    <FormSelect
                      name="loanAccount"
                      control={control}
                      //   required={true}
                      options={allGender}
                      placeholder={'Select Loan A/C'}
                      labelField="label"
                      valueField="value"
                    />
                    <FormSelect
                      name="paymentMode"
                      control={control}
                      //   required={true}
                      options={allGender}
                      placeholder={'Select Payment Mode'}
                      labelField="label"
                      valueField="value"
                    />
                    <View style={{ marginLeft: 10 }}>
                      <EText type="b16" color={current.new_primary}>
                        Payment Amount : 45000 Rs.{' '}
                      </EText>
                      <EText type="b16" color={current.new_primary}>
                        Remarks : The GL has partially paid
                      </EText>
                    </View>
                  </View>
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default ListOfDataPage;
