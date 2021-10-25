from rest_framework.generics import ListAPIView, GenericAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from user.models import User
from user.serializers import UserSerializer, CustomTokenObtainPairSerializer
from rest_framework.response import Response


class ListAllUsersView(ListAPIView):
    """
    get:
    List all users
    search: filter
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        search_string = self.request.query_params.get('search')
        if search_string:
            return User.objects.filter(username__icontains=search_string)
        return User.objects.all()


class SpecificUserView(RetrieveAPIView):
    """
    get:
    Get specific user profile
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_url_kwarg = 'user_id'


class RetrieveUpdateProfileView(GenericAPIView):
    """
    get:
    Get own profile
    patch:
    Update own profile
    """
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        return Response(self.get_serializer(user).data)

    def patch(self, request, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(user_id=user, **serializer.validated_data)
        return Response(serializer.validated_data)


class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer


class RetrieveUpdateDeleteUserView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = [IsAuthenticated]
