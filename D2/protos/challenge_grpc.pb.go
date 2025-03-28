// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.3.0
// - protoc             v3.21.12
// source: protos/challenge.proto

package grpc_challenge

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

const (
	Challenge_Ping_FullMethodName    = "/challenge.Challenge/Ping"
	Challenge_Add_FullMethodName     = "/challenge.Challenge/Add"
	Challenge_Forward_FullMethodName = "/challenge.Challenge/Forward"
)

// ChallengeClient is the client API for Challenge service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type ChallengeClient interface {
	Ping(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*ServiceReply, error)
	Add(ctx context.Context, in *AddRequest, opts ...grpc.CallOption) (*AddResponse, error)
	Forward(ctx context.Context, in *ForwardRequest, opts ...grpc.CallOption) (*ServiceReply, error)
}

type challengeClient struct {
	cc grpc.ClientConnInterface
}

func NewChallengeClient(cc grpc.ClientConnInterface) ChallengeClient {
	return &challengeClient{cc}
}

func (c *challengeClient) Ping(ctx context.Context, in *Empty, opts ...grpc.CallOption) (*ServiceReply, error) {
	out := new(ServiceReply)
	err := c.cc.Invoke(ctx, Challenge_Ping_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *challengeClient) Add(ctx context.Context, in *AddRequest, opts ...grpc.CallOption) (*AddResponse, error) {
	out := new(AddResponse)
	err := c.cc.Invoke(ctx, Challenge_Add_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *challengeClient) Forward(ctx context.Context, in *ForwardRequest, opts ...grpc.CallOption) (*ServiceReply, error) {
	out := new(ServiceReply)
	err := c.cc.Invoke(ctx, Challenge_Forward_FullMethodName, in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// ChallengeServer is the server API for Challenge service.
// All implementations must embed UnimplementedChallengeServer
// for forward compatibility
type ChallengeServer interface {
	Ping(context.Context, *Empty) (*ServiceReply, error)
	Add(context.Context, *AddRequest) (*AddResponse, error)
	Forward(context.Context, *ForwardRequest) (*ServiceReply, error)
	mustEmbedUnimplementedChallengeServer()
}

// UnimplementedChallengeServer must be embedded to have forward compatible implementations.
type UnimplementedChallengeServer struct {
}

func (UnimplementedChallengeServer) Ping(context.Context, *Empty) (*ServiceReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Ping not implemented")
}
func (UnimplementedChallengeServer) Add(context.Context, *AddRequest) (*AddResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Add not implemented")
}
func (UnimplementedChallengeServer) Forward(context.Context, *ForwardRequest) (*ServiceReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Forward not implemented")
}
func (UnimplementedChallengeServer) mustEmbedUnimplementedChallengeServer() {}

// UnsafeChallengeServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to ChallengeServer will
// result in compilation errors.
type UnsafeChallengeServer interface {
	mustEmbedUnimplementedChallengeServer()
}

func RegisterChallengeServer(s grpc.ServiceRegistrar, srv ChallengeServer) {
	s.RegisterService(&Challenge_ServiceDesc, srv)
}

func _Challenge_Ping_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ChallengeServer).Ping(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Challenge_Ping_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ChallengeServer).Ping(ctx, req.(*Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _Challenge_Add_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(AddRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ChallengeServer).Add(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Challenge_Add_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ChallengeServer).Add(ctx, req.(*AddRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Challenge_Forward_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ForwardRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(ChallengeServer).Forward(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: Challenge_Forward_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(ChallengeServer).Forward(ctx, req.(*ForwardRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Challenge_ServiceDesc is the grpc.ServiceDesc for Challenge service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Challenge_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "challenge.Challenge",
	HandlerType: (*ChallengeServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Ping",
			Handler:    _Challenge_Ping_Handler,
		},
		{
			MethodName: "Add",
			Handler:    _Challenge_Add_Handler,
		},
		{
			MethodName: "Forward",
			Handler:    _Challenge_Forward_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "protos/challenge.proto",
}
