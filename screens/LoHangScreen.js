import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions/user_actions';
import { fetchDataLoHang } from '../actions/garco10_actions';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Icon, Button, Overlay, Text, Card } from 'react-native-elements';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import LoHangInfo from '../components/LoHangInfo';
import { Colors, Fonts, Metrics } from '../themes';

const styles = StyleSheet.create({
    defaultRowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    defaultColumnContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlayButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    overlayButton: {
        marginBottom: 10
    },

});
const { defaultRowContainer, defaultColumnContainer, overlayButton, overlayButtonContainer } = styles;

class LoHangScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logingOut: false
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Lô sản xuất',
            headerRight: (
                <Icon
                    reverse
                    name='ios-log-out'
                    type='ionicon'
                    color={Colors.darkPink}
                    size={28}
                    onPress={navigation.getParam('logOutUser')} />
            )
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            logOutUser: this.logOutUser
        });
        this.props.fetchDataLoHang(0, this.props.auth.user.ID_DonVi);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.auth.user) {
            this.props.navigation.navigate('Auth');
        }
    }

    logOutUser = () => {
        this.setState({ logingOut: true });
    }

    logOutConfirm = () => {
        this.props.logOut();
    }

    logOutCancel = () => {
        this.setState({ logingOut: false });
    }

    renderLoHang = () => {
        const { garco10 } = this.props;
        return garco10.lohang.map((item, index) => {
            return (
                <LoHangInfo lohang={item} key={index}>
                    <Button
                        icon={<Icon name="ios-create-outline" type="ionicon" color={Colors.snow} />}
                        title="Cập nhật ra chuyền"
                        buttonStyle={{ backgroundColor: Colors.darkPink }}
                        titleStyle={{ fontFamily: Fonts.type.medium, color: Colors.snow }}
                        onPress={() => this.props.navigation.navigate('LoHangUpdate', { lohangIndex: index })}
                    />
                </LoHangInfo>
            );
        });
    }
    render() {
        const dateString = moment().format('DD/MM/YYYY');
        if (this.props.garco10.fetching) {
            return (
                <View>
                    <Spinner
                        visible={this.props.garco10.fetching}
                        textContent={"Loading..."}
                        textStyle={{ fontFamily: Fonts.type.medium, color: Colors.drawer }}
                        animation="fade"
                    />
                </View>
            )
        }

        if (this.props.garco10.error) {
            return (
                <View style={defaultColumnContainer}>
                    <Text style={Fonts.style.subTitle1}>
                        {this.props.garco10.error}
                    </Text>
                </View>
            )
        }

        if (this.state.logingOut) {
            return (
                <View style={defaultColumnContainer}>
                    <Overlay
                        isVisible={this.state.logingOut}
                        onBackdropPress={this.logOutCancel}
                        overlayStyle={{
                            height: Metrics.screenHeight / 3
                        }}
                    >
                        <View style={[defaultColumnContainer, { flex: 2 }]}>
                            <Text style={{ fontFamily: 'roboto-medium' }}>
                                Bạn có chắc muốn đăng xuất?
                            </Text>
                        </View>

                        <View style={[overlayButtonContainer]}>
                            <Button
                                title="Có"
                                onPress={this.logOutConfirm}
                                buttonStyle={[overlayButton, { backgroundColor: Colors.darkPink }]}
                                titleStyle={{ fontFamily: Fonts.type.medium, color: 'white', marginHorizontal: 20 }}
                            />
                            <Button
                                title="Không"
                                onPress={this.logOutCancel}
                                buttonStyle={[overlayButton, { backgroundColor: 'white', borderColor: Colors.darkPink, borderWidth: 1 }]}
                                titleStyle={{ fontFamily: Fonts.type.medium, color: Colors.darkPink }}
                            />
                        </View>
                    </Overlay>
                </View>
            )
        }
        return (
            <ScrollView>
                {this.renderLoHang()}
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => ({
    garco10: state.garco10,
    auth: state.auth
});
export default connect(
    mapStateToProps,
    {
        logOut,
        fetchDataLoHang
    }
)(LoHangScreen);

